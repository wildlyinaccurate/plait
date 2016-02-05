# Components

A Plait application is made up of components which represent small, self-contained pieces of functionality. A component has a state (or a _model_, if you prefer), a view, and an updater which it uses to modify its state.

Writing a component is simple, since a component is just a plain JavaScript object with three functions:

```js
function init () {
  return {
    balance: 0
  }
}

function update (state, action) {
  switch (action.type) {
    case 'DEPOSIT':
      return state.update('balance', b => b + action.amount)
  }
}

function view (state, dispatch) {
  return h(
    'button',
    {
      'ev-click': dispatch({ type: 'DEPOSIT', amount: 1000 })
    },
    'Deposit 1000'
  )
}
```

## `init`

This function is called by Plait to retrieve the initial state of a component. You don't need to define all of the state's properties up-front; you only need to provide values for properties which you know you will need to render the component for the first time.

You can also optionally return an action from `init` by returning an array of `[state, action]`. This is useful for doing things like loading remote data.

## `update`

The `update` function is responsible for modifying a component's state. It is given the component's current state and an _action_.

An action is just a plain JavaScript object which you can pass around your components to describe changes. All actions must have a `type` property, but other than that, their structure is entirely up to you.

This function is **pure**, which means that rather than directly modifying the state, it returns a _copy_ of the state. Plait makes this simple because a component's state is always wrapped in a [`State`](../API/State.md) object.

> **Note:** A Plait component's `update` function might be familiar if you have used Redux -- it is essentially a [reducer](http://rackt.org/redux/docs/basics/Reducers.html).

## `view`

The `view` function renders a component at any given state. It is given the component's state (as a [`State`](../API/State.md) object) and a `dispatch` function which can be used by event handlers.

Views are written using [virtual-hyperscript](https://github.com/Matt-Esch/virtual-dom/blob/master/virtual-hyperscript/README.md), though it is possible to write them with JSX and transform them into virtual-hyperscript using something like [jsx-transform](https://github.com/alexmingoia/jsx-transform/).

Using JSX, the `view` function above could be written as:

```jsx
function view (state, dispatch) {
  return (
    <button ev-click={dispatch({ type: 'DEPOSIT', amount: 1000 })}>
      Deposit 1000
    </button>
  )
}
```
