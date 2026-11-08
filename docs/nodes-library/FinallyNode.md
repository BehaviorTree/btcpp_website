---
sidebar_position: 7
sidebar_label: Finally Node
---

# Finally Node

:::info Since 4.11
The `Finally` node was added in BT.CPP 4.11.

"Finally" is now the ID of a built-in node: an application that registers its own
node with the ID `Finally` gets a duplicate-registration error
(`ID [Finally] already registered`) and must use a different ID.
:::

The Finally node is the equivalent of a `try/finally` block: it ticks its first child
(**main**) and, once main has completed, its second child (**cleanup**).
Cleanup is executed whether main succeeded or failed, when main threw an exception
and when the Finally node is halted.

A Finally node must have **exactly 2 children**. This is checked when the XML is loaded.

| Port | Type | Default | Description |
|------|------|---------|-------------|
| `halt_timeout_msec` | InputPort\<unsigned\> | 0 | When the node is halted, how long to keep ticking cleanup before halting it unfinished, in milliseconds. With 10 or less, cleanup gets a single tick (see below). |

```xml
<Finally>
    <Sequence>
        <EnableMotors/>
        <MoveToGoal goal="{target}"/>
    </Sequence>
    <DisableMotors/>
</Finally>
```

`DisableMotors` is executed whether `EnableMotors` and `MoveToGoal` succeed or fail.

## Return status

- While main is RUNNING, Finally returns RUNNING. When main returns SUCCESS or FAILURE,
  cleanup is ticked; Finally keeps returning RUNNING while cleanup is RUNNING.
- When cleanup completes, Finally returns the status of main, or FAILURE if cleanup failed.
- If main returns SKIPPED on its first tick, it did nothing: cleanup is not executed and
  Finally returns SKIPPED. If main is skipped after it returned RUNNING (for instance by
  `_while`), cleanup is executed and Finally returns SKIPPED, or FAILURE if cleanup failed.
- If main throws an exception, main is halted, cleanup is executed and, once cleanup
  completes, the exception is rethrown.
- If cleanup throws, its exception propagates and replaces the result (or the exception) of main.

## Halt behavior

If the Finally node is halted while main or cleanup is RUNNING, main is halted and cleanup
is ticked inside `halt()`:

- By default (`halt_timeout_msec` 10 or less), cleanup gets a **single tick**. This suits a
  synchronous cleanup. An asynchronous cleanup child, for instance a `StatefulActionNode`,
  gets `onStart()` and then `onHalted()` right away.
- With `halt_timeout_msec` above 10, cleanup is ticked once and then again every 10 ms,
  until it completes or the timeout expires; in the latter case it is halted unfinished.

```xml
<ReactiveSequence>
    <IsBatteryOk/>
    <Finally halt_timeout_msec="200">
        <MoveToGoal goal="{target}"/>
        <ParkArm/>
    </Finally>
</ReactiveSequence>
```

If `IsBatteryOk` fails while `MoveToGoal` is RUNNING, the ReactiveSequence halts Finally:
`MoveToGoal` is halted and `ParkArm` is ticked for up to 200 milliseconds.

:::caution
The loop enabled by `halt_timeout_msec` **blocks** the node that halts Finally (in the
example, the ReactiveSequence) for up to `halt_timeout_msec`, and nothing else in the
tree is ticked meanwhile. Nested Finally nodes add up their timeouts. Keep the value short.

The loop runs only when the node is halted from the thread that ticked it.
A halt from another thread, such as the timer of a `Timeout` decorator or a callback
calling `Tree::haltTree()`, gives cleanup a single tick and prints a note to stderr.
:::

`halt()` never throws: if cleanup fails, throws or times out during a halt, the error is
printed to stderr.
