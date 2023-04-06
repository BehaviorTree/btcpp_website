---
sidebar_position: 9
sidebar_label: 09. Scripting example
---

# Introduction to the Scripting language

A more detailed description can be found
at [Introduction to Scripting](guides/scripting.md).
This tutorial provides a very basic example that you can use 
as an initial playground.

## Script and Precondition nodes

In our scripting language, variables are entries in the
blackboard.

In this example, we use the node **Script** to set these 
variables and observe as we can access them as input ports
in **SaySomething**.

The types being supported are numbers (integers and reals),
strings and registered ENUMS.

:::caution
Note that we use **magic_enums** that has some known 
[limitations](https://github.com/Neargye/magic_enum/blob/master/doc/limitations.md).

A notable one is that the default range is [-128, 128], unless
changes as described in the link above.
:::

We will use this XML:

```xml
<root BTCPP_format="4">
  <BehaviorTree>
    <Sequence>
      <Script code=" msg:='hello world' " />
      <Script code=" A:=THE_ANSWER; B:=3.14; color:=RED " />
        <Precondition if="A>B && color != BLUE" else="FAILURE">
          <Sequence>
            <SaySomething message="{A}"/>
            <SaySomething message="{B}"/>
            <SaySomething message="{msg}"/>
            <SaySomething message="{color}"/>
        </Sequence>
      </Precondition>
    </Sequence>
  </BehaviorTree>
</root>
```

We expected the following blackboard entries to contain:

- **msg**: the string "hello world"
- **A**: the integer value corresponding to the alias THE_ANSWER.
- **B**: the real value 3.14
- **C**: the integer value corresponding to the enum RED.

The expected output is, therefore:

```console
Robot says: 42.000000
Robot says: 3.140000
Robot says: hello world
Robot says: 1.000000
```

The C++ code is:

```cpp
enum Color
{
  RED = 1,
  BLUE = 2,
  GREEN = 3
};

int main()
{
  BehaviorTreeFactory factory;
  factory.registerNodeType<DummyNodes::SaySomething>("SaySomething");

  // We can add these enums to the scripting language.
  // Check the limits of magic_enum
  factory.registerScriptingEnums<Color>();

  // Or we can manually assign a number to the label "THE_ANSWER".
  // This is not affected by any range limitation
  factory.registerScriptingEnum("THE_ANSWER", 42);

  auto tree = factory.createTreeFromText(xml_text);
  tree.tickWhileRunning();

  return 0;
}
```