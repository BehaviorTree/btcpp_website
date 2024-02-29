---
title: Migration from BT.CPP 3.x
description: How to migrate your code from version 3.8
hide_table_of_contents: false
sidebar_position: 7
---

# Migrating from version 3.8 to 4.X

You will find that most of the changes in version 4.X
are incremental and back compatible with your previous code.

Here we try to summarize the most relevant difference 
that you should be aware of, when migrating.

:::note
In the repository you can find a Python script called **convert_v3_to_v4.py**
that may save you some time (thanks to user https://github.com/SubaruArai)!

Try it, but make sure that you double-check the result first!
:::

## Class renaming 

The names of the following classes / XML tags changed.

| Name in 3.8+ | Name in 4.x | Where |
|-------------|---------|---------|
| NodeConfiguration | NodeConfig | C++ |
| SequenceStar | SequenceWithMemory | C++ and XML |
| AsyncActionNode | ThreadedAction | C++ |
| Optional | Expected | C++ |

If you want to quickly fix the compilation of your C++ code (**even if refactoring is encouraged**) add:

```cpp
namespace BT 
{
  using NodeConfiguration = NodeConfig;
  using AsyncActionNode = ThreadedAction;
  using Optional = Expected;
}
```

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

This will allow us to be compatible with both versions 3 and 4... eventually!

## SubTree and SubTreePlus
 
The default **SubTree** in 3.X has been deprecated in favor of **SubtreePlus**.
Being this the new default, we simply call it "SubTree".

| Name in 3.8+ | Name in 4.x |
|-------------|---------|
| `<SubTree>` | Deprecated |
| `<SubTreePlus>` | `<SubTree>` |

## SetBlackboard and BlackboardCheck

The new [scripting language](/docs/guides/scripting) is much simpler and more powerful.

Check also the introduction to [Pre and Post Conditions](/docs/guides/pre_post_conditions).

Old code in **3.8**:

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
<MyAction _failureIf="port_A!=port_B"/>
```

## Ticking in a While Loop

A typical execution used to look like this:

```cpp
// simplified code, frequently found in BT.CPP 3.8
while(status != NodeStatus::SUCCESS || status == NodeStatus::FAILURE) 
{
  status tree.tickRoot();
  std::this_thread::sleep_for(sleep_ms);
}
```

The "polling" model of Behavior Trees is sometimes criticized. The sleep is necessary to
avoid "busy loops", but may introduce some latency.


To improve the reactiveness of behavior trees, we introduced the method 
```cpp
Tree::sleep(std::chrono::milliseconds timeout)
```

This particular implementation of **sleep** can be interrupted if **any** node in the tree invokes the method `TreeNode::emitWakeUpSignal`. 
This allows the loop to re-tick the tree **immediately**.

The method `Tree::tickRoot()` has been removed from the public API and the new recommended approach is:

```cpp
// Use Tree::sleep and wait for either SUCCESS or FAILURE
while(!BT::isStatusCompleted(status)) 
{
  status = tree.tickOnce();
  tree.sleep(sleep_ms);
}
//---- or, even better ------
status = tree.tickWhileRunning(sleep_ms); 
```

`Tree::tickWhileRunning` is the new default and it has its own internal loop; 
the first argument is a timeout of the sleep inside the loop.

Alternatively, you may use these methods:

- `Tree::tickExactlyOnce()`: equivalent to the old behavior in 3.8+
- `Tree::tickOnce()` is roughly equivalent to `tickWhileRunning(0ms)`. It may potentially tick more than once.


# ControlNodes and Decorators must support NodeStatus:SKIPPED

The purpose of this new status is to be returned when a [PreCondition](/docs/guides/pre_post_conditions) is not met.

When a Node returns **SKIPPED**, it is notifying to its parent (ControlNode or Decorator) that it hasn't been executed.

:::note
When you implement your own custom **Leaf Node**, you shall not return **SKIPPED**.
This status is reserved for PreConditions.

On the other hand, **ControlNodes and Decorators** must be modified to support this
new status. 
:::

The usual rule of thumb is that, if a child Node returns **SKIPPED**, 
it means that it was not executed, and the ControlNode should move to the next one.

# Asychronous Control Nodes

A serious problem was detected by a user 
[here](https://github.com/BehaviorTree/BehaviorTree.CPP/issues/395):

> If a **ControlNode** or **DecoratorNode** has synchronous children only,
it is impossible to interrupt them.

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
When a `Sequence` (or `Fallback`) has only synchronous children, the entire sequence becomes "atomic". 

In other words, when "synch_sequence" starts, it is impossible for `AbortCondition` to stop it.

To address this issue, we added two new nodes, `AsyncSequence` and `AsyncFallback`.

When `AsyncSequence` is used, **RUNNING** is returned after the execution of **each** synchronous child, before moving to the next sibling.

In the example above, to complete the entire tree successfully we need 3 ticks.

