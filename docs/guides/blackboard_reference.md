---
sidebar_position: 4
---

# Zero-copy access to the blackboard

If you followed the tutorials, you should already know that the Blackboard uses **value semantic**, i.e. 
the methods `getInput` and `setOutput` copy the value from/to the blackboard.

In some cases, it could be desirable to use, instead, **reference semantic**, i.e. access the 
object stored in the Blackboard directly. This is particularly important when the object is:

- a complex data structure
- expensive to copy
- non-copyable.

For instance, a Node where it is recommended to use reference semantic is the
`LoopNode` decorator, that modifies "in-place" a vector of objects.


## Method 1: Blackboard entries as Share pointers

For the sake of simplicity, we will consider an object that is expensive to copy,
 called **Pointcloud**.

 Assuming that we have a simple BT like this one:

 ```xml 
  <root BTCPP_format="4" >
     <BehaviorTree ID="SegmentCup">
        <Sequence>
            <AcquirePointCloud  cloud="{pointcloud}"/>
            <SegmentObject  obj_name="cup" cloud="{pointcloud}" obj_pose="{pose}"/>
        </Sequence>
     </BehaviorTree>
 </root>
 ```

 - **AcquirePointCloud** will write into the blackboard entry `pointcloud`.
 - **SegmentObject** will read from that entry.

 The recommended port types, in this case is:

```cpp
PortsList AcquirePointCloud::providedPorts()
{
    return { OutputPort<std::shared_ptr<Pointcloud>>("cloud") };
}

PortsList SegmentObject::providedPorts()
{
    return { InputPort<std::string>("obj_name"),
             InputPort<std::shared_ptr<Pointcloud>>("cloud"),
             OutputPort<Pose3D>("obj_pose") };
}
```

The methods `getInput` and `setOutput` can be used as usual and still have value semantic.
But since the object being copied is a `shared_ptr` we are actually accessing the
pointcloud instance by reference.

## Method 2: thread-safe castPtr (recommended since version 4.5.1)

The most notable issue, when using the `shared_ptr` approach, is that it is **NOT thread safe**.

IF multithreading is used, inside a Node (remember that BT.CPP is single-threaded by default),
then there is no guarantee that a copy of the object being shared isn't accessed during writing.

To prevent this issue, we provide a different API that includes a locking mechanism.


```cpp
// inside this scope (as long as any_locked exists), a mutex protecting 
// the instance of "cloud" remains locked
if(auto any_locked = getLockedPortContent("cloud"))
{
  if(any_locked->empty())
  {
    // the entry in the blackboard hasn't been initialized yet.
  }
  else if(Pointcloud* cloud_ptr = any_locked->castPtr<Pointcloud>())
  {
    // Succesful cast to Pointcloud* (original type).
    // Modify the pointcloud instance, using cloud_ptr
  }
}
```

