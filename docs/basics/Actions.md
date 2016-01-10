# Actions

In a Plait application, the only way to send information around a component is with actions. Actions are small objects which describe the _intent_ to change a component's state. Actions themselves don't actually make any changes -- it's up to the component's `update` function to interpret each action and act accordingly.

Let's look at how the [Counter component][../examples/Counter.md] uses actions.

The component's `view` is given a `dispatch` function. This function doesn't immediately dispatch an action, but instead returns an event handler which will dispatch the event when it is called.

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

This means that when the `+` button is clicked, an action `{ type: 'INCREMENT' }` will be dispatched.

When an action is dispatched, it is sent to the component's `update` function, which may or may not act upon that action.

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

This `update` function will modify the component's state if it receives a `DECREMENT` or `INCREMENT` action. But any other actions are ignored.
