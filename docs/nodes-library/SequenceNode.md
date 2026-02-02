# Sequences

A __Sequence__ ticks all its children as long as
they return SUCCESS. If any child returns FAILURE, the sequence is aborted.

Currently the framework provides four kinds of nodes:

- Sequence
- AsyncSequence
- SequenceWithMemory
- ReactiveSequence

They share the following rules:

- Before ticking the first child, the node status becomes __RUNNING__.

- If a child returns __SUCCESS__, it ticks the next child.

- If the __last__ child returns __SUCCESS__ too, all the children are halted and
 the sequence returns __SUCCESS__.

### Synchronous vs Asynchronous

`Sequence` and `AsyncSequence` share the same logic, but differ in how they
handle the transition between children:

- **Sequence** ticks all children in a single tick of the tree. When a child
  returns SUCCESS, the next child is ticked immediately within the same call.
- **AsyncSequence** yields execution back to the tree after each child succeeds,
  returning RUNNING and emitting a wake-up signal. This makes the sequence
  **interruptible** between children, allowing other parts of the tree (e.g., a
  ReactiveSequence parent) to re-evaluate conditions before the next child starts.

Use `AsyncSequence` when the sequence is inside a reactive parent and you need
conditions to be re-checked between each step.

### Comparison table

To understand how the four ControlNodes differ, refer to the following table:

| Type of ControlNode | Child returns FAILURE  |  Child returns RUNNING | Yields between children |
|---|:---:|:---:|:---:|
| Sequence | Restart  | Tick again  | No |
| AsyncSequence | Restart | Tick again | Yes |
| ReactiveSequence  | Restart  |  Restart | No |
| SequenceWithMemory | Tick again  | Tick again  | No |

- "__Restart__" means that the entire sequence is restarted from the first
  child of the list.

- "__Tick again__" means that the next time the sequence is ticked, the
  same child is ticked again. Previous siblings, which returned SUCCESS already,
  are not ticked again.

> For the complete list of built-in nodes, see the other pages in this section and the [source code](https://github.com/BehaviorTree/BehaviorTree.CPP/tree/master/include/behaviortree_cpp) on Github.

## Sequence

This tree represents the behavior of a sniper in a computer game.

![SequenceNode](images/SequenceNode.svg)


## AsyncSequence

AsyncSequence behaves like Sequence, but **yields execution** back to the tree
after each child returns SUCCESS. It returns RUNNING and emits a wake-up signal,
allowing a reactive parent to re-evaluate conditions before the next child is ticked.

```xml
<ReactiveSequence>
    <IsEnemyVisible/>
    <AsyncSequence>
        <AimWeapon/>
        <FireWeapon/>
        <ReloadWeapon/>
    </AsyncSequence>
</ReactiveSequence>
```

In this example, `IsEnemyVisible` is re-checked between each step of the
AsyncSequence. If the enemy disappears after `AimWeapon` succeeds, the sequence
is interrupted before `FireWeapon` starts.

## ReactiveSequence

This node is particularly useful to continuously check Conditions; but 
the user should also be careful when using asynchronous children, to be
sure that they are not ticked more often than expected.

Let's take a look at another example:

![ReactiveSequence](images/ReactiveSequence.svg)

`ApproachEnemy` is an __asynchronous__ action that returns RUNNING until
it is, eventually, completed.

The __synchronous__ condition `isEnemyVisible` will be called many times and
returns true or false quickly. If it becomes false (i,e, "FAILURE"), `ApproachEnemy`
is halted.


## SequenceWithMemory

Use this ControlNode when you don't want to tick children again that 
already returned SUCCESS.

__Example__:

This is a patrolling agent/robot that must visit locations A, B and C __only once__.
If the action __GoTo(B)__ fails, __GoTo(A)__ will not be ticked again.

On the other hand, __isBatteryOK__ must be checked at every tick, 
for this reason its parent must be a `ReactiveSequence`.

![SequenceWithMemory](images/SequenceWithMemory.svg)
