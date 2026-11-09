---
sidebar_position: 6
sidebar_label: Switch Node
---

# Switch Node

The SwitchNode is equivalent to a `switch` statement: it selects which child to
execute based on the value of a blackboard variable.

Available variants: `Switch2`, `Switch3`, `Switch4`, `Switch5`, `Switch6`, where the
number indicates how many case branches are supported.

A SwitchN node must have exactly **N + 1 children**: N case branches plus one **default**
branch (always the last child).

| Port | Type | Description |
|------|------|-------------|
| `variable` | InputPort\<string\> | The blackboard variable to compare against cases. |
| `case_1` | InputPort\<string\> | Value to match for the 1st child. |
| `case_2` | InputPort\<string\> | Value to match for the 2nd child. |
| ... | ... | Additional cases up to N. |

The `variable` value is compared to each `case_N` string in order. The child
corresponding to the first match is executed. If no case matches, the **last child**
(the default branch) is executed.

Comparison supports strings, integers, and doubles. Enum values registered via
`ScriptingEnumsRegistry` are also supported.

```xml
<Switch3 variable="{robot_state}" case_1="IDLE" case_2="WORKING" case_3="ERROR">
    <HandleIdle/>          <!-- executed when robot_state == "IDLE" -->
    <HandleWorking/>       <!-- executed when robot_state == "WORKING" -->
    <HandleError/>         <!-- executed when robot_state == "ERROR" -->
    <HandleUnknownState/>  <!-- default: executed when no case matches -->
</Switch3>
```

If a previously matched child is RUNNING and the `variable` value changes on a subsequent
tick, the running child is **halted** before the newly matched child is executed.

:::tip
The same behavior can be achieved using multiple Sequences, Fallbacks, and Conditions,
but Switch is more concise and readable.
:::
