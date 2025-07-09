# Sequences

A __Sequence__ ticks all its children as long as 
they return SUCCESS. If any child returns FAILURE, the sequence is aborted.

Currently the framework provides three kinds of nodes:

- Sequence
- SequenceWithMemory
- ReactiveSequence

They share the following rules:

- Before ticking the first child, the node status becomes __RUNNING__.

- If a child returns __SUCCESS__, it ticks the next child.

- If the __last__ child returns __SUCCESS__ too, all the children are halted and
 the sequence returns __SUCCESS__.

To understand how the three ControlNodes differ, refer to the following table:

 
| Type of ControlNode | Child returns FAILURE  |  Child returns RUNNING |
|---|:---:|:---:|
| Sequence | Restart  | Tick again  |
| ReactiveSequence  | Restart  |  Restart |
| SequenceWithMemory | Tick again  | Tick again  |

- "__Restart__" means that the entire sequence is restarted from the first 
  child of the list.

- "__Tick again__" means that the next time the sequence is ticked, the 
  same child is ticked again. Previous siblings, which returned SUCCESS already,
  are not ticked again.

> Some nodes are not listed yet. See [controls](https://github.com/BehaviorTree/BehaviorTree.CPP/tree/master/include/behaviortree_cpp/controls) on Github for complete definitions.

## Sequence

This tree represents the behavior of a sniper in a computer game.

![SequenceNode](images/SequenceNode.svg)


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
