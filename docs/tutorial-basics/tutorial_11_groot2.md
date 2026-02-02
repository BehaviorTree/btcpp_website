---
sidebar_position: 11
sidebar_label: 11. Connect to Groot2
---

**Groot2** is the official IDE to Edit, Monitor and interact with
a Behavior Tree created with **BT.CPP**.

Integrating the two is very easy, as you will see in this tutorial,
but there are some simple concepts that you should understand first.

## The TreeNodesModel

Groot requires a "TreeNode model".

![](images/t12_groot_models.png)

For instance, in the image above, Groot needs to know that the user-defined nodes
`ThinkWhatToSay` and `SaySomething` exist.

Additionally, it requires:

- The Node type
- Name and type (input/output) of ports.

These models are expressed in XML. In this case, they would be:

```xml
  <TreeNodesModel>
    <Action ID="SaySomething">
      <input_port name="message"/>
    </Action>
    <Action ID="ThinkWhatToSay">
      <output_port name="text"/>
    </Action>
  </TreeNodesModel>
```

Nevertheless, **you should not create these
XML descriptions by hand**.

BT.CPP has a specific function that will
generate this XML for you.

```cpp
  BT::BehaviorTreeFactory factory;
  //
  // register here your user-defined Nodes
  // 
  std::string xml_models = BT::writeTreeNodesModelXML(factory);

  // this xml_models should be saved to file and 
  // loaded in Groot2
```

To import these models into the UI, either:

- Save the XML into a file (called for instance `models.xml`) and click on the button **Import Models** in Groot2.
- or manually add the XML section directly to your `.xml` or `.btproj` file.

## Adding real-time visualization to Groot

:::note
Currently, only the PRO version of Groot2 supports real-time visualization.
:::

Connecting a tree to Groot2 requires a single line of code:

```cpp
BT::Groot2Publisher publisher(tree);
```

This will create an inter-process communication service
between your BT.CPP executor and Groot2 that:

- Sends the entire tree structure to Groot2, including the Models mentioned above.
- Periodically updates the status of the individual Nodes (RUNNING, SUCCESS, FAILURE, IDLE).
- Sends the value of the blackboard(s); basic types such as integers, reals and strings are supported out of the box, others need to be added manually.
- Allows Groot2 to insert breakpoints, perform a Node substitution or fault injection.

Full example:

```xml
<root BTCPP_format="4">

  <BehaviorTree ID="MainTree">
    <Sequence>
      <Script code="door_open:=false" />
      <Fallback>
        <Inverter>
          <IsDoorClosed/>
        </Inverter>
        <SubTree ID="DoorClosed" _autoremap="true" door_open="{door_open}"/>
      </Fallback>
      <PassThroughDoor/>
    </Sequence>
  </BehaviorTree>

  <BehaviorTree ID="DoorClosed">
    <Fallback name="tryOpen" _onSuccess="door_open:=true">
      <OpenDoor/>
        <RetryUntilSuccessful num_attempts="5">
          <PickLock/>
        </RetryUntilSuccessful>
      <SmashDoor/>
    </Fallback>
  </BehaviorTree>

</root>
```

```cpp
int main()
{
  BT::BehaviorTreeFactory factory;

  // Our set of simple Nodes, related to CrossDoor
  CrossDoor cross_door;
  cross_door.registerNodes(factory);

  // Groot2 editor requires a model of your registered Nodes.
  // You don't need to write that by hand, it can be automatically
  // generated using the following command.
  std::string xml_models = BT::writeTreeNodesModelXML(factory);

  factory.registerBehaviorTreeFromText(xml_text);
  auto tree = factory.createTree("MainTree");

  // Connect the Groot2Publisher. This will allow Groot2 to
  // get the tree and poll status updates.
  BT::Groot2Publisher publisher(tree);

  // we want to run this indefinitely
  while(1)
  {
    std::cout << "Start" << std::endl;
    cross_door.reset();
    tree.tickWhileRunning();
    std::this_thread::sleep_for(std::chrono::milliseconds(3000));
  }
  return 0;
}
```

## Visualize custom types in the Blackboard

The content inside the blackboard is sent to Groot2 using a JSON format.

Basic types (integers, reals, strings) are supported out of the box. To allow
Groot2 to visualize your own custom types, you need to include
**behaviortree_cpp/json_export.h** and define a JSON converter.

### Using the BT_JSON_CONVERTER macro (recommended)

The simplest approach is to use the `BT_JSON_CONVERTER` macro.
Given a user-defined type:

```cpp
struct Position2D
{
  double x;
  double y;
};
```

Define the converter at file scope (outside any function):

```cpp
#include "behaviortree_cpp/json_export.h"

BT_JSON_CONVERTER(Position2D, pos)
{
  add_field("x", &pos.x);
  add_field("y", &pos.y);
}
```

This works with nested types too:

```cpp
struct Waypoint
{
  std::string name;
  Position2D position;
  double speed = 1.0;
};

BT_JSON_CONVERTER(Waypoint, wp)
{
  add_field("name", &wp.name);
  add_field("position", &wp.position);
  add_field("speed", &wp.speed);
}
```

Then, register the types in your **main** (before creating the tree):

```cpp
BT::RegisterJsonDefinition<Position2D>();
BT::RegisterJsonDefinition<Waypoint>();
```

See the full example in [t11_groot_howto.cpp](https://github.com/BehaviorTree/BehaviorTree.CPP/blob/master/examples/t11_groot_howto.cpp).

### Manual converter (alternative)

If you need more control over the JSON serialization, you can write
a conversion function with the signature `void(nlohmann::json&, const T&)` and
register it explicitly:

```cpp
void PositionToJson(nlohmann::json& dest, const Position2D& pos) {
  dest["x"] = pos.x;
  dest["y"] = pos.y;
}

// in main()
BT::RegisterJsonDefinition<Position2D>(PositionToJson);
```