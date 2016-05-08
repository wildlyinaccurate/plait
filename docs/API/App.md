# App

The App object is the bread and butter of a Plait application. Even so, its API is tiny.

* [`start(component)`](#start)
* [`render(appNode, rootNode)`](#render)
* [`initializeComponent(component, [dispatch])`](#initializeComponent)
* [`forwardDispatch(action, dispatch, state)`](#forwardDispatch)


<hr>

### <a id="start"></a> [`start(component)`](#start)

Starts a Plait application life cycle from a root component.

#### Arguments

##### `component` (Object)

A [component object](../basics/Components.md) which has _all_ of the following properties:

* `init` (Function)
* `update` (Function)
* `view` (Function)

#### Returns

(DOMNode): The root node of the application. This can be inserted into the document to render an application on the page.


<hr>

### <a id="render"></a> [`render(appNode, rootNode)`](#render)

Renders a Plait application node to a DOM node.

#### Arguments

##### `appNode` (DOMNode)

A Plait application node returned from `start(component)`.

##### `rootNode` (DOMNode)

The DOM node which the application node should be rendered to.

#### Returns

(DOMNode): The root DOM node.

<hr>

### <a id="initializeComponent"></a> [`initializeComponent(component, [dispatch])`](#initializeComponent)

Initializes a component. Used to create child components from within a parent component.

#### Arguments

##### `component` (Object)

A [component object](../basics/Components.md) which has _at least_ the following properties:

* `init` (Function)

##### [`dispatch`] (Function)

A dispatcher function. This is only required when the return value of `component.init()` is of type `[initialState, initialAction]`. In this case, the `initialAction` action is dispatched using the `dispatch` function.

#### Returns

([State](State.md)): A State object which contains the initial state of `component`.


<hr>

### <a id="forwardDispatch"></a> [`forwardDispatch(action, dispatch, state)`](#forwardDispatch)

Wraps a dispatcher so that any dispatched actions are instead forwarded to the given action. The given action will be annotated with the `$fwdAction` property, containing the originally dispatched action.

This function is generally used to create a dispatch function which will be passed to the `view` function of child components. It allows the parent component to forward the child component's actions to its own `update` function.

#### Arguments

##### `action` (any)

The [action](../basics/Actions.md) which will be dispatched when the forwarded dispatch function is called.

##### `dispatch` (Function)

The dispatcher function to be forwarded.

##### `state` ([State](State.md))

The state given to any [asynchronous actions](../advanced/AsynchronousActions.md). This is usually the state of a child component.

#### Returns

(Function): A dispatcher function which will forward any incoming actions to the provided `action`.
