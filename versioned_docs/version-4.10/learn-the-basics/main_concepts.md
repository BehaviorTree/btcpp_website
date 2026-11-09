# Main Concepts

__BehaviorTree.CPP__ is a C++ library that can be easily integrated into
your favourite distributed middleware, such as __ROS__ or __SmartSoft__.

You can statically link it into your application (for example a game).

These are the main concepts which you need to understand first.

## Nodes vs Trees

The user must create his/her own ActionNodes and ConditionNodes (LeafNodes);
this library helps you to compose them easily into trees. 

Think about the LeafNodes as the building blocks which you need to compose a complex system. If Nodes were **lego bricks**, your trees would be lego sets.

![](images/lego.jpg) 


By definition, your custom Nodes are (or should be) highly __reusable__.

## Instantiate trees at run-time using the XML format

Despite the fact that the library is written in C++, trees themselves
can be created and composed at _run-time_, more specifically, at _deployment-time_, using an XML base scripting language.

An XML format is described in details [here](xml_format.md), but the best way to
learn the syntax is following the tutorials.

## The tick() callbacks

Any TreeNode can be seen as a mechanism to invoke a __callback__, i.e. to 
__run a piece of code__. What this callback does is up to you.

In most of the following tutorials, our Actions will simply
print messages on console or sleep for a certain amount of time to simulate
a long calculation.

In production code, especially in Model Driven Development and Component 
Based Software Engineering, an Action/Condition would probably communicate
to other _components_ or _services_ of the system.

``` cpp
// The simplest callback you can wrap into a BT Action
NodeStatus HelloTick()
{
  std::cout << "Hello World\n"; 
  return NodeStatus::SUCCESS;
}

// Allow the library to create Actions that invoke HelloTick()
// (explained in the tutorials)
factory.registerSimpleAction("Hello", std::bind(HelloTick));
```

::::tip
The factory may create multiple instances of the node __Hello__.
::::

## Create custom nodes with inheritance

In the example above, a specific type of TreeNodes which invoke
`HelloTick` was created using a __function pointer__ (dependency injection).

Generally, to define a custom TreeNode, you should inherit from the 
class `TreeNode` or, more specifically, its derived classes:

- `ActionNodeBase`
- `ConditionNode`
- `DecoratorNode`

As a reference please look at the [first tutorial](tutorial-basics/tutorial_01_first_tree.md).

## Dataflow, Ports and Blackboard

Ports are explained in detail in the [second](tutorial-basics/tutorial_02_basic_ports.md)
and [third](tutorial-basics/tutorial_03_generic_ports.md) tutorials.

For the time being, it is important to know that:

- A __Blackboard__ is a _key/value_ storage shared by all the Nodes of a Tree.

- __Ports__ are a mechanism that Nodes can use to exchange information between
  each other.
 
- Ports are _"connected"_ using the same _key_ of the blackboard.

- The number, name and kind of ports of a Node must be known at _compilation-time_ (C++); 
  connections between ports are done at _deployment-time_ (XML).  

- You can store as value any C++ type (we use a _type erasure_ technique
similar to [std::any](https://www.fluentcpp.com/2021/02/05/how-stdany-works/)).




