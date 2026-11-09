---
sidebar_position: 5
sidebar_label: Conditional Control Nodes
---

# Conditional Control Nodes

These control nodes select which child to execute based on the result of a condition (the first child).

Currently the framework provides two kinds:

- IfThenElse
- WhileDoElse

Both must have exactly **2 or 3 children**.

## IfThenElse

IfThenElse is a **non-reactive** conditional node.

- The **1st child** is the condition ("if").
- The **2nd child** is executed if the condition returns SUCCESS ("then").
- The **3rd child** (optional) is executed if the condition returns FAILURE ("else").

If only 2 children are provided and the condition returns FAILURE, the node returns FAILURE
(equivalent to having `AlwaysFailure` as the 3rd child).

The condition is evaluated **only once**. If the 2nd or 3rd child returns RUNNING,
the condition is **not** re-evaluated on subsequent ticks.

```xml
<IfThenElse>
    <IsDoorOpen/>          <!-- condition -->
    <WalkThrough/>         <!-- then branch -->
    <TryAnotherPath/>      <!-- else branch (optional) -->
</IfThenElse>
```

## WhileDoElse

WhileDoElse is the **reactive** variant of IfThenElse. It re-evaluates the condition
at **every tick**.

- The **1st child** is the condition, evaluated on every tick ("while").
- The **2nd child** is executed while the condition returns SUCCESS ("do").
- The **3rd child** (optional) is executed while the condition returns FAILURE ("else").

If the 2nd or 3rd child is RUNNING and the condition result **changes**, the running
child is **halted** before switching to the other branch.

```xml
<WhileDoElse>
    <IsBatteryOK/>         <!-- condition, re-evaluated each tick -->
    <ContinueMission/>     <!-- do branch -->
    <GoToChargingStation/> <!-- else branch (optional) -->
</WhileDoElse>
```

## IfThenElse vs WhileDoElse

| Feature | IfThenElse | WhileDoElse |
|---------|------------|-------------|
| Re-evaluates condition? | No | Yes (every tick) |
| Reactive | No | Yes |
| Halts running child on condition change? | N/A | Yes |
| Use case | One-time branching | Continuous monitoring |
