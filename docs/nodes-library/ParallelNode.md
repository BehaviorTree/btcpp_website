---
sidebar_position: 4
sidebar_label: Parallel Nodes
---

# Parallel Nodes

Parallel nodes execute all their children **concurrently**, but **not** in separate threads.
All children are ticked in sequence within a single tick of the tree, and multiple children
may be in the RUNNING state at the same time.

:::caution
"Parallel" refers to the fact that multiple children can be RUNNING simultaneously.
The children are still ticked sequentially within the same thread.
For actual multi-threaded execution, children must be asynchronous nodes internally.
:::

Currently the framework provides two kinds of nodes:

- Parallel
- ParallelAll

## Parallel

The ParallelNode is the **only** node that can have multiple children RUNNING at the same time.
It is completed when either the SUCCESS or FAILURE threshold is reached. Any remaining
running children are halted.

| Port | Type | Default | Description |
|------|------|---------|-------------|
| `success_count` | InputPort\<int\> | -1 | Number of children that must succeed to return SUCCESS. |
| `failure_count` | InputPort\<int\> | 1 | Number of children that must fail to return FAILURE. |

Threshold values support **Python-style negative indexing**: `-1` is equivalent to the
total number of children. For example, with 4 children, `success_count="-1"` means all 4
must succeed.

**Default behavior** (success_count=-1, failure_count=1): all children must succeed; if any
single child fails, the node returns FAILURE.

```xml
<Parallel success_count="2" failure_count="2">
    <ActionA/>
    <ActionB/>
    <ActionC/>
</Parallel>
```

In this example with 3 children:
- If 2 children return SUCCESS (before 2 fail), the node returns SUCCESS.
- If 2 children return FAILURE (before 2 succeed), the node returns FAILURE.
- Remaining RUNNING children are halted when either threshold is reached.

## ParallelAll

Unlike Parallel, the ParallelAll node **always executes ALL children to completion**.
It never halts children early. This is useful when you need all side effects to complete.

| Port | Type | Default | Description |
|------|------|---------|-------------|
| `max_failures` | InputPort\<int\> | 1 | Maximum number of child failures allowed before returning FAILURE. |

- Returns **SUCCESS** if the number of FAILUREs is **less than** `max_failures`.
- Returns **FAILURE** if the number of FAILUREs **equals or exceeds** `max_failures`.
- Use `max_failures="-1"` (number of children) to always return SUCCESS regardless of child results.

```xml
<ParallelAll max_failures="2">
    <ActionA/>
    <ActionB/>
    <ActionC/>
</ParallelAll>
```

## Parallel vs ParallelAll

| Feature | Parallel | ParallelAll |
|---------|----------|-------------|
| Early termination | Yes (halts children when threshold reached) | No (always runs all children) |
| Success threshold | Configurable (`success_count`) | All non-failed children |
| Failure threshold | Configurable (`failure_count`) | Configurable (`max_failures`) |
| Use case | Race conditions, N-of-M success | All tasks must attempt completion |
