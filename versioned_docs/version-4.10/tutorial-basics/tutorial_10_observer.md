---
sidebar_position: 10
sidebar_label: 10. Loggers and Observer
---

# The logger interface

BT.CPP provides a way to add **loggers** to a tree
at run-time, usually, after the tree is created and before
you start ticking it.

A "logger" is a class that has a callback invoked every time
a TreeNode changes its status; it is a non-intrusive implementation
of the so-called [observer pattern](https://en.wikipedia.org/wiki/Observer_pattern).

More specifically, the callback that will be invoked is:

```cpp
  virtual void callback(
    BT::Duration timestamp, // When the transition happened
    const TreeNode& node,   // the node that changed its status
    NodeStatus prev_status, // the previous status
    NodeStatus status);     // the new status
```

## The TreeObserver class

Sometimes, in particular when implementing **unit tests**,
it is convenient to know how many times a certain Node
returned SUCCESS or FAILURE.

For instance, we want to check that under certain conditions,
a branch is taken and another one is not executed.

The `TreeObserver` is a simple logger implementation that collects
the following statistics for each node of the tree:

```cpp
struct NodeStatistics
  {
    // Last valid result, either SUCCESS or FAILURE
    NodeStatus last_result;
    // Last status. Can be any status, including IDLE or SKIPPED
    NodeStatus current_status;
    // count status transitions, excluding transition to IDLE
    unsigned transitions_count;
    // count number of transitions to SUCCESS
    unsigned success_count;
    // count number of transitions to FAILURE
    unsigned failure_count;
    // count number of transitions to SKIPPED
    unsigned skip_count;
    // timestamp of the last transition
    Duration last_timestamp;
  };
```

## How to uniquely identify a Node

Since the observer allows us to collect the statistics of a
specific Node, we need a way to uniquely identify that node:

Two mechanisms can be used:

- the `TreeNode::UID()` that is a unique number corresponding
to the [depth-first traversal](https://en.wikipedia.org/wiki/Depth-first_search) of the tree.

- the `TreeNode::fullPath()` that aims to be a unique but 
human-readable identifier of a specific Node.

We use the term "path", because a typical string value may look like this:

     first_subtree/nested_subtree/node_name

In other words, the path contains information about the location of
a Node, within the Subtree hierarchy.

The "node_name" is either the name attribute assigned in the XML
or is assigned automatically, using the Node registration 
followed by "::" and the UID.

## Example (XML)

Consider the following XML, which has a non-trivial hierarchy, in 
terms of SubTrees:

```xml
<root BTCPP_format="4">
  <BehaviorTree ID="MainTree">
    <Sequence>
     <Fallback>
       <AlwaysFailure name="failing_action"/>
       <SubTree ID="SubTreeA" name="mysub"/>
     </Fallback>
     <AlwaysSuccess name="last_action"/>
    </Sequence>
  </BehaviorTree>

  <BehaviorTree ID="SubTreeA">
    <Sequence>
      <AlwaysSuccess name="action_subA"/>
      <SubTree ID="SubTreeB" name="sub_nested"/>
      <SubTree ID="SubTreeB" />
    </Sequence>
  </BehaviorTree>

  <BehaviorTree ID="SubTreeB">
    <AlwaysSuccess name="action_subB"/>
  </BehaviorTree>
</root>
```

You may notice that some Nodes have the XML attribute "name"
whilst others don't.

The corresponding list of **UID** -> **fullPath** pairs is:

```
1 -> Sequence::1
2 -> Fallback::2
3 -> failing_action
4 -> mysub
5 -> mysub/Sequence::5
6 -> mysub/action_subA
7 -> mysub/sub_nested
8 -> mysub/sub_nested/action_subB
9 -> mysub/SubTreeB::9
10 -> mysub/SubTreeB::9/action_subB
11 -> last_action
```

## Example (C++)

The following application will:

- Print the structure of the tree recursively.
- Attach the `TreeObserver`to the tree.
- Print the `UID / fullPath` pairs.
- Collect the statistics of a specific node called "last_action".
- Show all the statistics collected by the observer.


```cpp
int main()
{
  BT::BehaviorTreeFactory factory;

  factory.registerBehaviorTreeFromText(xml_text);
  auto tree = factory.createTree("MainTree");

  // Helper function to print the tree.
  BT::printTreeRecursively(tree.rootNode());

  // The purpose of the observer is to save some statistics about the number of times
  // a certain node returns SUCCESS or FAILURE.
  // This is particularly useful to create unit tests and to check if
  // a certain set of transitions happened as expected
  BT::TreeObserver observer(tree);

  // Print the unique ID and the corresponding human readable path
  // Path is also expected to be unique.
  std::map<uint16_t, std::string> ordered_UID_to_path;
  for(const auto& [name, uid]: observer.pathToUID()) {
    ordered_UID_to_path[uid] = name;
  }

  for(const auto& [uid, name]: ordered_UID_to_path) {
    std::cout << uid << " -> " << name << std::endl;
  }


  tree.tickWhileRunning();

  // You can access a specific statistic, using is full path or the UID
  const auto& last_action_stats = observer.getStatistics("last_action");
  assert(last_action_stats.transitions_count > 0);

  std::cout << "----------------" << std::endl;
  // print all the statistics
  for(const auto& [uid, name]: ordered_UID_to_path) {
    const auto& stats = observer.getStatistics(uid);

    std::cout << "[" << name
              << "] \tT/S/F:  " << stats.transitions_count
              << "/" << stats.success_count
              << "/" << stats.failure_count
              << std::endl;
  }

  return 0;
}
```