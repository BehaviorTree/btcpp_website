---
title: Migration to BT.CPP 4.x
description: How to migrate your code from version 3.X
hide_table_of_contents: false
---

# Migrating from version 3.X to 4.X

You will find that most of the changes in version 4.X
are incremental and back compatible with your previous code.

Here we try to summarize the most relevant difference 
that you should be aware of, when migrating.

## Class renaming 

The name of the following classes / XML tags changed.

| Name in 3.8+ | Name in 4.x |
|-------------|---------|
| `NodeConfiguration` | `NodeConfig` | 
| `SequenceStar` | `SequenceWithMemory` |
| `AsyncActionNode` | `ThreadedAction` | 

:::info
These changes can be disabled with the CMake option __USE_V3_COMPATIBLE_NAMES__.
:::

## SubTree and SubTreePlus

The deafault **SubTree** in 3.X has been deprecated and
**SubtreePlus** is the new default, being easier to use and 
more consistent.

| Name in 3.8+ | Name in 4.x |
|-------------|---------|
| `<SubTree>` | Deprecated |
| `<SubTreePlus>` | `<SubTree>` |

## SetBlackbard and BlackboardPrecondition

The new [scripting language](docs/tutorial-advanced/scripting)
is much simpler and more powerful.

Old code in **3.8+**:

``` xml
<SetBlackbard output_key="port_A" value="42" />
<SetBlackbard output_key="port_B" value="69" />
<BlackboardCheckInt value_A="{port_A}" value_B="{port_B}" 
                    return_on_mismatch="FAILURE">
    <MyAction/>
</BlackboardCheckInt>
```

New code in **4.X**:

``` xml
<Script code="port_A:=42; port_B:=69" />
<Precondition if="port_A==port_B" else="FAILURE">
    <MyAction/>
</Precondition>
```

## Preemptable Nodes and Tree::tickRoot()

A serious problem was detected by a user 
[here](https://github.com/BehaviorTree/BehaviorTree.CPP/issues/395):

> If a **ControlNode** or **DecoratorNode** has synchronous children only,
it is impossible to interrupt it.

The only way to solve this was to add a `return RUNNING` statement
every time a **Synchronous** child is executed (unless it is the last one).

For instance, given a tree:

```xml
<Sequence name="synch_sequence">
    <SyncActionA/>
    <SyncActionB/>
    <SyncActionC/>
<Sequence>
```
Version **3.X** would execute this in a single **tick()**.

In version **4.X** the node `Sequence` will return **RUNNING**
twice: after executing `SyncActionA` and `SyncActionB`.

The advantage is that now **synch_sequence** can be pontentially interrupted.
The drawback is that we need to tick the tree more often.

To be sure that this is done correctly and **to avoid introducing any additional latency" 
(no sleep between the children), we changed the API of `Tree::tickRoot()`:

- `Tree::tickOnce()` works as usual. It should run inside a while-loop.
- `Tree::tickWhileRunning()` has its own while-loop, and will continue ticking until either 
SUCCESS or FAILURE is received.
