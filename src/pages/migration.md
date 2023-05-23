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

:::note
In the repository you can find a Python script called **convert_v3_to_v4.py**
that may save you some time (thanks to use https://github.com/SubaruArai)!

Try it, but make sure that you double check the result first!
:::

## Class renaming 

The name of the following classes / XML tags changed.

| Name in 3.8+ | Name in 4.x | Where |
|-------------|---------|---------|
| NodeConfiguration | NodeConfig | C++ |
| SequenceStar | SequenceWithMemory | C++ and XML |
| AsyncActionNode | ThreadedAction | C++ |
| Optional | Expected | C++ |

If you want to quickly fix the compilation of your C++ code, **even if refactoring is encorauged**, do:

```cpp
namespace BT 
{
  using NodeConfiguration = NodeConfig;
  using AsyncActionNode = ThreadedAction;
  using Optional = Expected;
}
```

:::info
These changes can be disabled while compiling BT.CPP with the CMake option __USE_V3_COMPATIBLE_NAMES__.
:::

## XML  

You should add the attribute `BTCPP_format` to the \<root\> tag of your XML:

Before:
```xml
<root>
```

Now:
```xml
<root BTCPP_format="4">
```

This will allow us to be compatible
with both versions 3 and 4 (in future releases, not yet).

## SubTree and SubTreePlus

The deafault **SubTree** in 3.X has been deprecated and
**SubtreePlus** is the new default, being easier to use and 
more consistent.

| Name in 3.8+ | Name in 4.x |
|-------------|---------|
| `<SubTree>` | Deprecated |
| `<SubTreePlus>` | `<SubTree>` |

## SetBlackboard and BlackboardPrecondition

The new [scripting language](/docs/guides/scripting)
is much simpler and more powerful.

Old code in **3.8+**:

``` xml
<SetBlackboard output_key="port_A" value="42" />
<SetBlackboard output_key="port_B" value="69" />
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

## Ticking

The method `Tree::tickRoot()` was removed, and we introduced these two new methods instead:

- `Tree::tickOnce()` works as usual. It should run inside a while-loop.
- `Tree::tickWhileRunning()` has its own while-loop, and will continue ticking until either 
SUCCESS or FAILURE is received.

# Asychronous Control Nodes

A serious problem was detected by a user 
[here](https://github.com/BehaviorTree/BehaviorTree.CPP/issues/395):

> If a **ControlNode** or **DecoratorNode** has synchronous children only,
it is impossible to interrupt it.

Consider this example:

```xml
<ReactiveSequence>
    <AbortCondition/>
    <Sequence name="synch_sequence">
        <SyncActionA/>
        <SyncActionB/>
        <SyncActionC/>
    <Sequence>
</ReactiveSequence>   
```
When a `Sequence` (or `Fallback`) has only synchronous children, the entire sequence becomes
"atomic". 

In other words, when "synch_sequence" starts, it is impossible for `AbortCondition` to stop it.

To address this issue, we added two new nodes, `AsyncSequence` and `AsyncFallback`.

When `AsyncSequence` is used, **RUNNING** is returned after the execution of each synchronous child,
before moving to the next sibling.

In this way, we give allow the tree to run the `ReactiveSequence` above.  
