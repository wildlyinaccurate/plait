# Actions

In a Plait application, the only way to send information around a component is with actions. Actions are small objects which describe the _intent_ to change a component's state. Actions themselves don't actually make any changes -- it's up to the component's `update` function to interpret each action and act accordingly.

An action must be a plain JavaScript object, with at least a `type` property.

```js
{
  type: 'ACTION_NAME'
}
```

You can attach any other data you like to an action.

```js
{
  type: 'DELETE_ITEM',
  itemId: item.id,
  currentUser: {
    // ...
  }
}
```

## The `dispatch` function

Before an action is received by a component's `update` function, it must first be sent from somewhere. This is where the `dispatch` function comes in.

As well as the component's state, the `view` function takes another parameter: the `dispatch` function. Instead of immediately dispatching an action, this function returns an event handler which will dispatch the event when it is called. This is useful for attaching actions to DOM events.

For a simple example of how to use the `dispatch` function, see the [Counter component](../examples/Counter.md).

```jsx
function view (state, dispatch) {
  return (
    <div>
      <button ev-click={dispatch({ type: 'DECREMENT' })}>-</button>
      <span>{state.get('count')}</span>
      <button ev-click={dispatch({ type: 'INCREMENT' })}>+</button>
    </div>
  )
}
```

This means that when the `+` button is clicked, an action `{ type: 'INCREMENT' }` will be dispatched. Likewise when the `-` button is clicked, `{ type: 'DECREMENT' }` will be dispatched.

These actions have corresponding handlers in the component's `update` function.

```js
function update (state, action) {
  switch (action.type) {
    case 'DECREMENT':
      return state.update('count', x => x - 1)

    case 'INCREMENT':
      return state.update('count', x => x + 1)
  }
}
```

These handlers will modify the component's state if it receives a `DECREMENT` or `INCREMENT` action. Any other actions are ignored.

## DOM Events

Whenever an action is dispatched by a DOM event handler, the action will automatically be augmented with the event object, on the action's `$event` property. This allows components to act upon events from the DOM as part of the regular application flow.

For example, the value of an `<input>` element can be stored in a component's state by dispatching an action on the element's `change` event.

```jsx
function init () {
  return {
    query: ''
  }
}

function update (state, action) {
  switch (action.type) {
    case 'UPDATE_QUERY':
      return state.set('query', action.$event.target.value)
  }
}

function view (state, dispatch) {
  return (
    <input
      placeholder="Enter a search query"
      ev-change={dispatch({ type: 'UPDATE_QUERY' })}
      value={state.get('query')} />
  )
}
```
