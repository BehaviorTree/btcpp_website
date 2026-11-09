---
sidebar_position: 12
sidebar_label: 12. Default Port values
---

# Default Port values

When defining a port, it might be convenient to add a default value,
i.e. the value that the port should have if not specified in the XML.

:::note
Some of the examples shown in this tutorial will require version 4.5.2 or later.
:::

## Default InputPorts

Let's consider a node initializing multiple ports. We use a custom type **Point2D**,
but the same is true for simple types, such as `int`, `double` or `string`.

```cpp
  static PortsList providedPorts()
  {
    return { 
      BT::InputPort<Point2D>("input"),
      BT::InputPort<Point2D>("pointA", Point2D{1, 2}, "default value is x=1, y=2"),
      BT::InputPort<Point2D>("pointB", "3,4",         "default value is x=3, y=4"),
      BT::InputPort<Point2D>("pointC", "{point}",     "point by default to BB entry {point}"),
      BT::InputPort<Point2D>("pointD", "{=}",         "point by default to BB entry {pointD}") 
    };
  }
```

The very first one (`input`) has no default value and it is mandatory to providing either a value
or blackboard entry in the XML.

### Default values

```cpp
BT::InputPort<Point2D>("pointA", Point2D{1, 2}, "...");
```

If the template specialization `convertFromString<Point2D>()` is implemented, we can use that too.

In other words, the following syntaxes should be equivalent, if our **convertFromString** expects
two comma-separated values:

```cpp
BT::InputPort<Point2D>("pointB", "3,4", "...");
// should be equivalent to:
BT::InputPort<Point2D>("pointB", Point2D{3, 4}, "...");
```

### Default blackboard entry

Alternatively, we can define the default blackboard entry that the port should point at.

```cpp
BT::InputPort<Point2D>("pointC", "{point}", "...");
```

If the name of the port and the blackboard entry are the **same**, you can use `"{=}"`

```cpp
BT::InputPort<Point2D>("pointD", "{=}", "...");
// equivalent to:
BT::InputPort<Point2D>("pointD", "{pointD}", "...");
```

## Default OutputPorts

Output ports are more limited and can only point to a blackboard entry.
You can still use `"{=}"` when the two names are the same.

```cpp
  static PortsList providedPorts()
  {
    return { 
      BT::OutputPort<Point2D>("result", "{target}", "point by default to BB entry {target}");
    };
  }
```
