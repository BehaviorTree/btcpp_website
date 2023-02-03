---
sidebar_position: 3
---

# Asynchronous Actions

When designing reactive Behavior Trees, it is important to understand two main concepts:

- what we mean by **"Asynchronous"** Actions VS **"Synchronous"** ones.
- The difference between **Concurrency** and **Parallelism** in the context of BT.CPP.

## Concurrency vs Parallelism

If you Google those words, you will read many good articles about this topic.

:::info
**Concurrency** is when two or more tasks can start, run, and complete in overlapping time periods.
It doesn't necessarily mean they'll ever both be running at the same instant. 

**Parallelism** is when tasks literally run at the same time in different  threads, e.g., on a multicore processor.
:::

BT.CPP executes all the nodes **Concurrently**, in other words:

- The Tree execution engine is **single-threaded**.
- All the `tick()` methods are executed **sequentially**.
- If any `tick()` method is blocking, the entire flow of execution will be blocked.

We achieve reactive behaviors through "concurrency" and asynchronous execution.

In other words, an Action that takes a long time to execute should
return as soon as possible the state RUNNING.

This tells the tree executor that the action was started and needs more time to return
the state SUCCESS or FAILURE.
We need to tick that Node again, to know if the state changed or not (polling).

An Asynchronous node may delegate this long execution either to another process
(using inter-process communication) or another thread.

## Asynchronous vs Synchronous

In general, an Asynchronous Node is one that:

- May return RUNNING instead of SUCCESS or FAILURE, when ticked.
- Can be stopped as fast as possible when the method `halt()` is invoked.

Frequently, the method **halt()** must be implemented by the developer.

When your Tree executes an Asynchronous Action that returns RUNNING,
that state is usually **propagated backbard** and the entire Tree is considered
in the RUNNING state.

In the example below, "ActionE" is asynchronous and RUNNING; when
a node is RUNNING, usually its parent returns RUNNING too.

![tree in running state](images/RunningTree.svg)

Let's consider a simple "SleepNode". A good template to get started is 
the __StatefulActionNode__.

``` cpp

using namespace std::chrono;

// Example of Asynchronous node that uses StatefulActionNode as base class
class SleepNode : public BT::StatefulActionNode
{
  public:
    SleepNode(const std::string& name, const BT::NodeConfiguration& config)
      : BT::StatefulActionNode(name, config)
    {}

    static BT::PortsList providedPorts()
    {
      // amount of milliseconds that we want to sleep
      return{ BT::InputPort<int>("msec") };
    }

    NodeStatus onStart() override
    {
      int msec = 0;
      getInput("msec", msec);

      if( msec <= 0 ) {
        // No need to go into the RUNNING state
        return NodeStatus::SUCCESS;
      }
      else {
        // once the deadline is reached, we will return SUCCESS.
        deadline_ = system_clock::now() + milliseconds(msec);
        return NodeStatus::RUNNING;
      }
    }

    /// method invoked by an action in the RUNNING state.
    NodeStatus onRunning() override
    {
      if ( system_clock::now() >= deadline_ ) {
        return NodeStatus::SUCCESS;
      }
      else {
        return NodeStatus::RUNNING;
      }
    }

    void onHalted() override
    {
      // nothing to do here...
      std::cout << "SleepNode interrupted" << std::endl;
    }

  private:
    system_clock::time_point deadline_;
};
```

In the code above:

1. When the SleepNode is ticked the first time, the `onStart()` method is executed.
This may return SUCCESS immediately if the sleep time is 0 or will return RUNNING otherwise.
2. We should continue ticking the tree in a loop. This will invoke the method
`onRunning()` that may return RUNNING again or, eventually, SUCCESS.
3. Another node might trigger a `halt()` signal. In this case, the `onHalted()` method is invoked.

## Avoid blocking the execution of the tree

A **wrong** way to implement the `SleepNode` would be this one:

```c++
// This is the synchronous version of the Node. Probably not what we want.
class BadSleepNode : public BT::ActionNodeBase
{
  public:
    BadSleepNode(const std::string& name, const BT::NodeConfiguration& config)
      : BT::ActionNodeBase(name, config)
    {}

    static BT::PortsList providedPorts()
    {
      return{ BT::InputPort<int>("msec") };
    }

    NodeStatus tick() override
    {  
      int msec = 0;
      getInput("msec", msec);
      // This blocking function will FREEZE the entire tree :(
      std::this_thread::sleep_for( milliseconds(msec) );
      return NodeStatus::SUCCESS;
     }

    void halt() override
    {
      // No one can invoke this method, because I froze the tree.
      // Even if this method COULD be executed, there is no way I can
      // interrupt std::this_thread::sleep_for()
    }
};
```

## The problem with multi-threading

In the early days of this library (version 1.x), spawning a new thread
looked like a good solution to build asynchronous Actions.

That was a bad idea, for multiple reasons:

- Accessing the blackboard in a thread-safe way is harder (more about this later).
- You probably don't need to.
- People think that this will magically make the Action "asynchronous", but they 
forget that it is still **their responsibility** to stop that thread "somehow" and **fast** when 
the `halt()`method is invoked.

For this reason, users are usually discouraged from using `BT::ThreadedAction` as a
base class. Let's have a look again at the SleepNode.

```c++
// This will spawn its own thread. But it still has problems when halted
class BadSleepNode : public BT::ThreadedAction
{
  public:
    BadSleepNode(const std::string& name, const BT::NodeConfiguration& config)
      : BT::ActionNodeBase(name, config)
    {}

    static BT::PortsList providedPorts()
    {
      return{ BT::InputPort<int>("msec") };
    }

    NodeStatus tick() override
    {  
      // This code runs in its own thread, therefore the Tree is still running.
      // This seems good but the thread still can't be aborted
      int msec = 0;
      getInput("msec", msec);
      std::this_thread::sleep_for( std::chrono::milliseconds(msec) );
      return NodeStatus::SUCCESS;
    }
    // The halt() method can not kill the spawned thread :(
};
```

A correct version would be:

```c++
// I will create my own thread here, for no good reason
class ThreadedSleepNode : public BT::ThreadedAction
{
  public:
    ThreadedSleepNode(const std::string& name, const BT::NodeConfiguration& config)
      : BT::ActionNodeBase(name, config)
    {}

    static BT::PortsList providedPorts()
    {
      return{ BT::InputPort<int>("msec") };
    }

    NodeStatus tick() override
    {  
      // This code run in its own thread, therefore the Tree is still running.
      int msec = 0;
      getInput("msec", msec);

      using namespace std::chrono;
      const auto deadline = system_clock::now() + milliseconds(msec);

      // periodically check isHaltRequested() 
      // and sleep for a small amount of time only (1 millisecond)
      while( !isHaltRequested() && system_clock::now() < deadline )
      {
        std::this_thread::sleep_for( std::chrono::milliseconds(1) );
      }
      return NodeStatus::SUCCESS;
    }

    // The halt() method will set isHaltRequested() to true 
    // and stop the while loop in the spawned thread.
};
```

As you can see, this looks more complicated than the version we implemented
first, using `BT::StatefulActionNode`.
This pattern can still be useful in some case, but you must remember that introducing 
multi-threading make things more complicated and **should be avoided by default**. 

## Advanced example: client / server communication

Frequently, people using BT.CPP execute the actual task in a different process.

A typical (and recommended) way to do this in ROS is using [ActionLib](http://wiki.ros.org/actionlib).

ActionLib provides exactly the kind of API that we need to implement correctly an asynchronous behavior:

1. A non-blocking function to start the Action.
2. A way to monitor the current state of execution of the Action.
3. A way to retrieve the result or the error messages.
4. The ability to preempt / abort an action that is being executed.

None of these operations is "blocking", therefore we don't need to spawn our own thread.

More generally, we may assume that the developer has their own inter-processing communication, 
with a client/server relationship between the BT executor and the actual service provider.

