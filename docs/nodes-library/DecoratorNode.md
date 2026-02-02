# Decorators

A decorator is a node that must have a single child.

It is up to the Decorator to decide if, when and how many times the child should be
ticked.

> For the complete list of built-in nodes, see the other pages in this section and the [source code](https://github.com/BehaviorTree/BehaviorTree.CPP/tree/master/include/behaviortree_cpp) on Github.

## Inverter

Tick the child once and return SUCCESS if the child failed or FAILURE if
the child succeeded.

If the child returns RUNNING, this node returns RUNNING too.

## ForceSuccess

If the child returns RUNNING, this node returns RUNNING too.

Otherwise, it returns always SUCCESS.

## ForceFailure

If the child returns RUNNING, this node returns RUNNING too.

Otherwise, it returns always FAILURE.

## Repeat

Tick the child up to N times, as long as the child returns SUCCESS.

| Port | Type | Default | Description |
|------|------|---------|-------------|
| `num_cycles` | InputPort\<int\> | (required) | Number of repetitions. Use `-1` for infinite loop. |

- Returns **SUCCESS** after all N repetitions complete successfully.
- Returns **FAILURE** immediately if the child returns FAILURE (loop is interrupted).
- Returns **RUNNING** if the child returns RUNNING; the counter is **not** incremented and the same iteration resumes on the next tick.
- If the child returns **SKIPPED**, the child is reset but the counter is not incremented.

```xml
<Repeat num_cycles="3">
    <ClapYourHandsOnce/>
</Repeat>
```

## RetryUntilSuccessful

Tick the child up to N times, as long as the child returns FAILURE.

| Port | Type | Default | Description |
|------|------|---------|-------------|
| `num_attempts` | InputPort\<int\> | (required) | Number of attempts. Use `-1` for infinite retries. |

- Returns **SUCCESS** immediately if the child returns SUCCESS (loop is interrupted).
- Returns **FAILURE** after all N attempts are exhausted.
- Returns **RUNNING** if the child returns RUNNING; the attempt counter is **not** incremented and the same iteration resumes on the next tick.
- If the child returns **SKIPPED**, the child is reset and SKIPPED is returned.

```xml
<RetryUntilSuccessful num_attempts="3">
    <OpenDoor/>
</RetryUntilSuccessful>
```

:::note
The deprecated name `RetryUntilSuccesful` (single 's') is still supported for backward compatibility but should not be used in new trees.
:::

## KeepRunningUntilFailure

The KeepRunningUntilFailure node returns always FAILURE (FAILURE in child) or RUNNING (SUCCESS or RUNNING in child).

## Delay

Tick the child after a specified time has passed. The delay is specified as [Input Port](tutorial-basics/tutorial_02_basic_ports.md) `delay_msec`. If the child returns RUNNING, this node returns RUNNING too and will tick the child on next tick of the Delay node. Otherwise, return the status of the child node.

## Timeout

Halt a running child if it has been RUNNING longer than a given duration. This is the opposite of Delay: while Delay waits *before* ticking the child, Timeout interrupts a child that takes *too long*.

| Port | Type | Default | Description |
|------|------|---------|-------------|
| `msec` | InputPort\<unsigned\> | (required) | Timeout duration in milliseconds. |

- If the child completes (SUCCESS or FAILURE) before the timeout, its status is returned.
- If the child is still RUNNING when the timeout expires, it is halted and **FAILURE** is returned.

```xml
<Timeout msec="5000">
    <KeepYourBreath/>
</Timeout>
```

:::tip
Combine Timeout with RetryUntilSuccessful for a robust retry-with-timeout pattern:

```xml
<RetryUntilSuccessful num_attempts="3">
    <Timeout msec="5000">
        <LongRunningAction/>
    </Timeout>
</RetryUntilSuccessful>
```
:::

## RunOnce

The RunOnce node is used when you want to execute the child only once.
If the child is asynchronous, it will tick until either SUCCESS or FAILURE is returned.

After that first execution, you can set value of the [Input Port](tutorial-basics/tutorial_02_basic_ports.md) `then_skip` to:

- TRUE (default), the node will be skipped in the future.
- FALSE, return synchronously the same status returned by the child, forever.

## PreCondition

Cf. [Introduction to the Scripting language](../tutorial-basics/tutorial_09_scripting.md#script-and-precondition-nodes)

## SubTree

Cf. [Compose behaviors using Subtrees](../tutorial-basics/tutorial_05_subtrees).

## Other decorators requiring registration in C++

### ConsumeQueue

:::caution Deprecated
ConsumeQueue is deprecated. Use `LoopNode` instead (see [Tutorial 13](../tutorial-advanced/tutorial_13_blackboard_reference.md)).
:::

Execute the child node as long as the queue is not empty.
At each iteration, an item of type T is popped from the "queue" and inserted in "popped_item".

An empty queue will return SUCCESS

Register for example with `factory.registerNodeType<ConsumeQueue<Pose2D>>("ConsumeQueue");` Cf. [t18_waypoints.cpp](https://github.com/BehaviorTree/BehaviorTree.CPP/blob/master/examples/t18_waypoints.cpp).

### SimpleDecoratorNode

Register a simple decorator node with `void BehaviorTreeFactory::registerSimpleDecorator("MyDecorator", tick_function, ports)`, which uses `SimpleDecoratorNode` internally and where `tick_function` is a function with signature `std::function<NodeStatus(NodeStatus, TreeNode&)>` and ports is a variable of type `PortsList`.
