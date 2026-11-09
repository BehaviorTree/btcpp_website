# Fallbacks (Controls)

This family of nodes are known as "Selector" or "Priority"
in other frameworks.

Their purpose is to try different strategies, until we find one that "works".

Currently the framework provides three kinds of nodes:

- Fallback
- AsyncFallback
- ReactiveFallback

They share the following rules:

- Before ticking the first child, the node status becomes __RUNNING__.

- If a child returns __FAILURE__, the fallback ticks the next child.

- If the __last__ child returns __FAILURE__ too, all the children are halted and
 the fallback returns __FAILURE__.

- If a child returns __SUCCESS__, it stops and returns __SUCCESS__.
  All the children are halted.

### Synchronous vs Asynchronous

`Fallback` and `AsyncFallback` share the same logic, but differ in how they
handle the transition between children:

- **Fallback** ticks all children in a single tick of the tree. When a child
  returns FAILURE, the next child is ticked immediately within the same call.
- **AsyncFallback** yields execution back to the tree after each child fails,
  returning RUNNING and emitting a wake-up signal. This makes the fallback
  **interruptible** between children, allowing other parts of the tree (e.g., a
  ReactiveSequence parent) to re-evaluate conditions before the next child starts.

### Comparison table

To understand how the three ControlNodes differ, refer to the following table:

| Type of ControlNode | Child returns RUNNING | Yields between children |
|---|:---:|:---:|
| Fallback | Tick again  | No |
| AsyncFallback | Tick again | Yes |
| ReactiveFallback  |  Restart | No |

- "__Restart__" means that the entire fallback is restarted from the first
  child of the list.

- "__Tick again__" means that the next time the fallback is ticked, the
  same child is ticked again. Previous siblings, which returned FAILURE already,
  are not ticked again.

> For the complete list of built-in nodes, see the other pages in this section and the [source code](https://github.com/BehaviorTree/BehaviorTree.CPP/tree/master/include/behaviortree_cpp) on Github.

## Fallback

In this example, we try different strategies to open the door. 
Check first (and once) if the door is open.

![FallbackNode](images/FallbackSimplified.png)

## AsyncFallback

AsyncFallback behaves like Fallback, but **yields execution** back to the tree
after each child returns FAILURE. It returns RUNNING and emits a wake-up signal,
allowing a reactive parent to re-evaluate conditions before the next child is ticked.

```xml
<ReactiveSequence>
    <IsRobotHungry/>
    <AsyncFallback>
        <FindFoodInBackpack/>
        <FindNearbyRestaurant/>
        <OrderFoodDelivery/>
    </AsyncFallback>
</ReactiveSequence>
```

In this example, `IsRobotHungry` is re-checked between each attempt of the
AsyncFallback. If the robot is no longer hungry after `FindFoodInBackpack` fails,
the fallback is interrupted before `FindNearbyRestaurant` starts.

## ReactiveFallback

This ControlNode is used when we want to interrupt an __asynchronous__
child if one of the previous Conditions changes its state from 
FAILURE to SUCCESS.

In the following example, the character will sleep *up to* 8 hours. If he/she has fully rested, then the node `areYouRested?` will return SUCCESS and the asynchronous nodes `Timeout (8 hrs)` and `Sleep` will be interrupted.

![ReactiveFallback](images/ReactiveFallback.png)


 
