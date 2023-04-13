---
sidebar_position: 6
---

# Integration with ROS2

BehaviorTree.CPP is frequently used in robotics and in
the [ROS](https://docs.ros.org/en/humble/index.html) ecosystem.

We provide a ready-to-use set of wrappers, which can be used
to quickly implement TreeNodes that interact with ROS2: 
[BehaviorTree.ROS2](https://github.com/BehaviorTree/BehaviorTree.ROS2)

In terms of system architecture, we should remember that:

- You should have a centralized "Coordinator" ROS node that is responsible
for the execution of the behavior. This will be further called "Task Planner"
and it will be implemented with BT.CPP

- All other elements of the system should be"service-oriented" components,
and should delegate any business logic and decision-making to the Task Planner.

:::caution
Some words are the same, but have different meanings in
the context of **ROS** or **BT.CPP**.

In particular, the words "Action" and "Node":

- `TreeNode` vs `rclcpp::Node`
- `BT::Action` vs `rclcpp_action`.
:::

You can use these directly or use them as templates/blueprints to create your
own.


## Asynchronous BT::Action using rclcpp_action

The recommended way to interact with ROS is through the 
[rclcpp_action](https://docs.ros.org/en/humble/Tutorials/Intermediate/Writing-an-Action-Server-Client/Cpp.html).

They are a perfect fit, because:

- their API is asynchronous, i.e. the user 
should not worry about creating a separate thread.

- they can be aborted, a functionality that is needed to implement
`TreeNode::halt()` and build reactive behaviors.

Let's consider, for instance, the "Fibonacci" action client described in the
[official C++ tutorial](https://docs.ros.org/en/humble/Tutorials/Intermediate/Writing-an-Action-Server-Client/Cpp.html#writing-an-action-client):

```cpp
// let's define these, for brevity
using Fibonacci = action_tutorials_interfaces::action::Fibonacci;
using GoalHandleFibonacci = rclcpp_action::ServerGoalHandle<Fibonacci>;
```

To create a BT Action that invokes this ROS Action:

```cpp
#include <behaviortree_ros2/bt_action_node.hpp>

using namespace BT;

class FinonacciAction: public RosActionNode<Fibonacci>
{
public:
  FinonacciAction(const std::string& name,
                  const NodeConfig& conf,
                  const RosNodeParams& params)
    : RosActionNode<Fibonacci>(name, conf, params)
  {}

  // The specific ports of this Derived class
  // should be merged with the ports of the base class,
  // using RosActionNode::providedBasicPorts()
  static PortsList providedPorts()
  {
    return providedBasicPorts({InputPort<unsigned>("order")});
  }

  // This is called when the TreeNode is ticked and it should
  // send the request to the action server
  bool setGoal(RosActionNode::Goal& goal) override 
  {
    // get "order" from the Input port
    getInput("order", goal.order);
    // return true, if we were able to set the goal correctly.
    return true;
  }
  
  // Callback executed when the reply is received.
  // Based on the reply you may decide to return SUCCESS or FAILURE.
  NodeStatus onResultReceived(const WrappedResult& wr) override
  {
    std::stringstream ss;
    ss << "Result received: ";
    for (auto number : wr.result->sequence) {
      ss << number << " ";
    }
    RCLCPP_INFO(node_->get_logger(), ss.str().c_str());
    return NodeStatus::SUCCESS;
  }

  // Callback invoked when there was an error at the level
  // of the communication between client and server.
  // This will set the status of the TreeNode to either SUCCESS or FAILURE,
  // based on the return value.
  // If not overridden, it will return FAILURE by default.
  virtual NodeStatus onFailure(ActionNodeErrorCode error) override
  {
    RCLCPP_ERROR(node_->get_logger(), "Error: %d", error);
    return NodeStatus::FAILURE;
  }

  // we also support a callback for the feedback, as in
  // the original tutorial.
  // Usually, this callback should return RUNNING, but you
  // might decide, based on the value of the feedback, to abort
  // the action, and consider the TreeNode completed.
  // In that case, you should return SUCCESS or FAILURE.
  NodeStatus onFeedback(const std::shared_ptr<const Feedback> feedback)
  {
    std::stringstream ss;
    ss << "Next number in sequence received: ";
    for (auto number : feedback->partial_sequence) {
      ss << number << " ";
    }
    RCLCPP_INFO(node_->get_logger(), ss.str().c_str());
    return NodeStatus::RUNNING;
  }
};
```

You may notice that the BT version of the Action client is
simpler than the original one, since most of the boilerplate
is inside the  `BT::RosActionNode` wrapper.

When registering this node, we need to pass the `rclcpp::Node`
and other parameters using the `BT::RosNodeParams`:

```cpp
  // in main()
  BehaviorTreeFactory factory;

  auto node = std::make_shared<rclcpp::Node>("fibonacci_action_client");
  // provide the ROS node and the name of the action service
  RosNodeParams params; 
  params.nh = node;
  params.default_port_value = "fibonacci";
  factory.registerNodeType<SleepAction>("Sleep", params);
```

## Asynchronous BT::Action using rclcpp::Client (services)

An analogous wrapper is available for ROS Service Clients.
The asynchronous interface will be used.

The example below is based on the 
[official tutorial](https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Writing-A-Simple-Cpp-Service-And-Client.html#write-the-client-node).

```cpp
#include <behaviortree_ros2/bt_service_node.hpp>

using AddTwoInts = example_interfaces::srv::AddTwoInts;
using namespace BT;


class AddTwoIntsNode: public RosServiceNode<AddTwoInts>
{
  public:

  AddTwoIntsNode(const std::string& name,
                  const NodeConfig& conf,
                  const RosNodeParams& params)
    : RosServiceNode<AddTwoInts>(name, conf, params)
  {}

  // The specific ports of this Derived class
  // should be merged with the ports of the base class,
  // using RosServiceNode::providedBasicPorts()
  static PortsList providedPorts()
  {
    return providedBasicPorts({
        InputPort<unsigned>("A"),
        InputPort<unsigned>("B")});
  }

  // This is called when the TreeNode is ticked and it should
  // send the request to the service provider
  bool setRequest(Request::SharedPtr& request) override
  {
    // use input ports to set A and B
    getInput("A", request->a);
    getInput("B", request->b);
    // must return true if we are ready to send the request
    return true;
  }

  // Callback invoked when the answer is received.
  // It must return SUCCESS or FAILURE
  NodeStatus onResponseReceived(const Response::SharedPtr& response) override
  {
    RCLCPP_INFO(node_->get_logger(), "Sum: %ld", response->sum);
    return NodeStatus::SUCCESS;
  }

  // Callback invoked when there was an error at the level
  // of the communication between client and server.
  // This will set the status of the TreeNode to either SUCCESS or FAILURE,
  // based on the return value.
  // If not overridden, it will return FAILURE by default.
  virtual NodeStatus onFailure(ServiceNodeErrorCode error) override
  {
    RCLCPP_ERROR(node_->get_logger(), "Error: %d", error);
    return NodeStatus::FAILURE;
  }
};
```