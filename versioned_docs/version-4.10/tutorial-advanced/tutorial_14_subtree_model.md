---
sidebar_position: 14
sidebar_label: 14. Subtree Models and autoremap
---

# Subtree Models and autoremap

Subtree remapping was introduced in [Tutorial 6](../tutorial-basics/tutorial_06_subtree_ports.md).

Unfortunately, when using the same SubTree in multiple locations, we might find ourselves
copying and pasting the same long XML tags.

Consider for instance a case like this:

```xml
<SubTree ID="MoveRobot" target="{move_goal}"  frame="world" result="{error_code}" />
```

We don't want to copy and paste the three XML attributes `target`, `frame` and `result` every single time,
unless their value IS different.

To avoid that, we can define their default values in `<TreeNodesModel>`. 


```xml
  <TreeNodesModel>
    <SubTree ID="MoveRobot">
      <input_port  name="target"  default="{move_goal}"/>
      <input_port  name="frame"   default="world"/>
      <output_port name="result"  default="{error_code}"/>
    </SubTree>
  </TreeNodesModel>
```
Conceptually, this is similar to the 
default port explained in [Tutorial 12](tutorial-advanced/tutorial_12_default_ports.md).

If specified in the XML, the value of these remapped blackboard entries, will be overridden.
In the example below, we are overriding the value of "frame", but keeping the default
remapping otherwise.

```xml
<SubTree ID="MoveRobot" frame="map" />
```

## Autoremap

When the names of the entries in the SubTree and the parent tree are the **same**,
you can use the attribute `_autoremap`.

For instance:

```xml
<SubTree ID="MoveRobot" target="{target}"  frame="{frame}" result="{result}" />
```

Can be replaced by:
```xml
<SubTree ID="MoveRobot" _autoremap="true" />
```

We can still override a specific value, and autoremap the others

```xml
<SubTree ID="MoveRobot" _autoremap="true" frame="world" />
```

:::caution
The attribute `_autoremap="true"` will automatically remap **all** the entries in 
the SubTree, **unless** their name start with an underscore (character "_").

This could be a convenient way to mark an entry in a SubTree as "private".
:::