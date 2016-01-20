# Static

The Static utility allows components to be rendered as static HTML.

* [`render(component, [updater])`](#render)


<hr>

### <a id="render"></a> [`render(component, [updater])`](#render)

Renders a component as static HTML.

#### Arguments

##### `component` (Object)

A [component object](../basics/Components.md) which has _all_ of the following properties:

* `init` (Function)
* `update` (Function)
* `view` (Function)

##### [`updater`] (Function)

An updater function which can be used to modify a component's state before it is rendered. It is called with the component's initial state, and a callback (`updater(state, callback)`). When the updater has finished, it should call `callback` with the modified state.

See [Static Rendering](../advanced/StaticRendering.md) for more information.

#### Returns

If `updater` **is not** supplied: (String) The rendered HTML.

If `updater` **is** supplied: (Promise) A promise which resolves with the rendered HTML after the updater has been run.
