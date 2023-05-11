# Decorators

A decorator is a node that must have a single child.

It is up to the Decorator to decide if, when and how many times the child should be
ticked.

## Inverter

Tick the child once and return SUCCESS if the child failed or FAILURE if
the child succeeded.

If the child returns RUNNING, this node returns RUNNING too.

## ForceSuccess

If the child returns RUNNING, this node returns RUNNING too.

Otherwise, it returns always SUCCESS.

## ForceFailure

If the child returns RUNNING, this node returns RUNNING too.

Otherwise, it returns always FAILURE.

## Repeat

Tick the child up to N times (within one of its tick), where N is passed as [Input Port](tutorial-basics/tutorial_02_basic_ports.md) `num_cycles`,
as long as the child returns SUCCESS.
Return SUCCESS after the N repetitions in the case that the child always returned SUCCESS.

Interrupt the loop if the child returns FAILURE and, in that case, return FAILURE too.

If the child returns RUNNING, this node returns RUNNING too and the repetitions will continue without incrementing on the next tick of the Repeat node.

## RetryUntilSuccessful

Tick the child up to N times, where N is passed as [Input Port](tutorial-basics/tutorial_02_basic_ports.md) `num_attempts`,
as long as the child returns FAILURE.
Return FAILURE after the N attempts in the case that the child always returned FAILURE.

Interrupt the loop if the child returns SUCCESS and, in that case, return SUCCESS too.

If the child returns RUNNING, this node returns RUNNING too and the attempts will continue without incrementing on the next tick of the RetryUntilSuccessful node.

## KeepRunningUntilFailure

The KeepRunningUntilFailure node returns always FAILURE (FAILURE in child) or RUNNING (SUCCESS or RUNNING in child).

## Delay

Tick the child after a specified time has passed. The delay is specified as [Input Port](tutorial-basics/tutorial_02_basic_ports.md) `delay_msec`. If the child returns RUNNING, this node returns RUNNING too and will tick the child on next tick of the Delay node. Otherwise, return the status of the child node.

## RunOnce

The RunOnce node is used when you want to execute the child only once.
If the child is asynchronous, it will tick until either SUCCESS or FAILURE is returned.

After that first execution, you can set value of the [Input Port](tutorial-basics/tutorial_02_basic_ports.md) `then_skip` to:

- TRUE (default), the node will be skipped in the future.
- FALSE, return synchronously the same status returned by the child, forever.

## PreCondition

Cf. [Introduction to the Scripting language](../tutorial-basics/tutorial_09_scripting.md#script-and-precondition-nodes)

## SubTree

Cf. [Compose behaviors using Subtrees](../tutorial-basics/tutorial_05_subtrees).

## Other decorators requiring registration in C++

### ConsumeQueue

Execute the child node as long as the queue is not empty.
At each iteration, an item of type T is popped from the "queue" and inserted in "popped_item".

An empty queue will return SUCCESS

Register for example with `factory.registerNodeType<ConsumeQueue<Pose2D>>("ConsumeQueue");` Cf. [ex04_waypoints.cpp](https://github.com/BehaviorTree/BehaviorTree.CPP/blob/master/examples/ex04_waypoints.cpp).

### SimpleDecoratorNode

Register a simple decorator node with `void BehaviorTreeFactory::registerSimpleDecorator("MyDecorator", tick_function, ports)`, which uses `SimpleDecoratorNode` internally and where `tick_function` is a function with signature `std::function<NodeStatus(NodeStatus, TreeNode&)>` and ports is a variable of type `PortsList`.
