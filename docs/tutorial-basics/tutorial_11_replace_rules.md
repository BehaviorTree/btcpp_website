---
sidebar_position: 11
sidebar_label: 11. Substitution Rules
---

# Mock testing in BT.CPP

Sometimes, in particular when implementing integration and unit tests,
it is desirable to have a mechanism that allows us to quickly
substitute a specific Node, or an entire class of Nodes, with 
a "Test" version (mocking).

Since version 4.1, we introduced a new mechanism called "substitution
rules" which make this process easier.

It consists of additional methods in the `BehaviorTreeFactory` class
that should be called **after** the nodes are registered and 
**before** the actual tree is instantiated.

For example, given the XML:

```xml
<SaySomething name="talk" message="hello world"/>
```
we may want to substitute this node with another one, called
**TestMessage**:

The corresponding substitution is done with the command:

```cpp
factory.addSubstitutionRule("talk", "TestMessage");
```

The first argument contains the [wildcard string](https://en.wikipedia.org/wiki/Wildcard_character) that will be matched with the `TreeNode::fullPath`.

For details about **fullPath**, check the [previous tutorial](tutorial-basics/tutorial_10_observer.md).

## The TestNode

The `TestNode` is an Action that can be configured to:

- return a specific status, either SUCCESS or FAILURE
- be synchronous or asynchronous; in the latter case, a timeout should
be specified.
- a post-condition script, generally used to simulate an OutputPort. 

This simple dummy Node will not cover 100% of the cases, but can be 
the default solution for many substitution rules.


## Full example

In this example we will see how:

- We can use the substitution rule to substitute a node with another one.
- How to use the built-in `TestNode`.
- Examples of wildcard matching.
- How to pass these rules using a JSON file, at run-time.

We will use this XML:

```xml
<root BTCPP_format="4">
  <BehaviorTree ID="MainTree">
    <Sequence>
      <SaySomething name="talk" message="hello world"/>
        <Fallback>
          <AlwaysFailure name="failing_action"/>
          <SubTree ID="MySub" name="mysub"/>
        </Fallback>
        <SaySomething message="before last_action"/>
        <Script code="msg:='after last_action'"/>
        <AlwaysSuccess name="last_action"/>
        <SaySomething message="{msg}"/>
    </Sequence>
  </BehaviorTree>

  <BehaviorTree ID="MySub">
    <Sequence>
      <AlwaysSuccess name="action_subA"/>
      <AlwaysSuccess name="action_subB"/>
    </Sequence>
  </BehaviorTree>
</root>
```

The C++ code:

```cpp
int main(int argc, char** argv)
{
  BT::BehaviorTreeFactory factory;
  factory.registerNodeType<SaySomething>("SaySomething");

  // We use lambdas and registerSimpleAction, to create
  // a "dummy" node, that we want to substitute to a given one.

  // Simple node that just prints its name and return SUCCESS
  factory.registerSimpleAction("DummyAction", [](BT::TreeNode& self){
    std::cout << "DummyAction substituting: "<< self.name() << std::endl;
    return BT::NodeStatus::SUCCESS;
  });

  // Action that is meant to substitute SaySomething.
  // It will try to use the input port "message"
  factory.registerSimpleAction("TestSaySomething", [](BT::TreeNode& self){
    auto msg = self.getInput<std::string>("message");
    if (!msg)
    {
      throw BT::RuntimeError( "missing required input [message]: ", msg.error() );
    }
    std::cout << "TestSaySomething: " << msg.value() << std::endl;
    return BT::NodeStatus::SUCCESS;
  });

  //----------------------------
  // pass "no_sub" as first argument to avoid adding rules
  bool skip_substitution = (argc == 2) && std::string(argv[1]) == "no_sub";

  if(!skip_substitution)
  {
    // we can use a JSON file to configure the substitution rules
    // or do it manually
    bool const USE_JSON = true;

    if(USE_JSON)
    {
      factory.loadSubstitutionRuleFromJSON(json_text);
    }
    else {
      // Substitute nodes which match this wildcard pattern with TestAction
      factory.addSubstitutionRule("mysub/action_*", "TestAction");

      // Substitute the node with name [talk] with TestSaySomething
      factory.addSubstitutionRule("talk", "TestSaySomething");

      // This configuration will be passed to a TestNode
      BT::TestNodeConfig test_config;
      // Convert the node in asynchronous and wait 2000 ms
      test_config.async_delay = std::chrono::milliseconds(2000);
      // Execute this postcondition, once completed
      test_config.post_script = "msg ='message SUBSTITUED'";

      // Substitute the node with name [last_action] with a TestNode,
      // configured using test_config
      factory.addSubstitutionRule("last_action", test_config);
    }
  }

  factory.registerBehaviorTreeFromText(xml_text);

  // During the construction phase of the tree, the substitution
  // rules will be used to instantiate the test nodes, instead of the
  // original ones.
  auto tree = factory.createTree("MainTree");
  tree.tickWhileRunning();

  return 0;
}
```

## The JSON format

The JSON file, equivalent to the branch executed when `USE_JSON == false` is:

```json
{
  "TestNodeConfigs": {
    "MyTest": {
      "async_delay": 2000,
      "return_status": "SUCCESS",
      "post_script": "msg ='message SUBSTITUED'"
    }
  },

  "SubstitutionRules": {
    "mysub/action_*": "TestAction",
    "talk": "TestSaySomething",
    "last_action": "MyTest"
  }
}
```

As you can see, there are two main sections:

- **TestNodeConfigs**, where the parameters and name of one or
multiple **TestNode** are set.

- **SubstitutionRules** where the actual rules are specified.