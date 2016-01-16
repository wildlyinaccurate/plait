# Combining Components

The ability to combine components into a full application is an important part of the Plait framework. Each component exposes its functionality only as `init`, `update`, and `view` functions. This restricted interface makes it impossible to know the implementation details of a component, which is a good foundation for creating truly modular code.

Using the [`Counter` component](../examples/Counter.md) as an example, we can see how small components can be easily composed and reused throughout an application.

```jsx
export function init () {
  return {
    count: 0
  }
}

export function update (state, action) {
  switch (action.type) {
    case 'DECREMENT':
      return state.update('count', x => x - 1)

    case 'INCREMENT':
      return state.update('count', x => x + 1)
  }
}

export function view (state, dispatch) {
  return (
    <div>
      <button ev-click={dispatch({ type: 'DECREMENT' })}>-</button>
      <span>{state.get('count')}</span>
      <button ev-click={dispatch({ type: 'INCREMENT' })}>+</button>
    </div>
  )
}
```

As a slightly contrived example, we can build a component which renders two counters. The state of this counter will have two properties, one for each of the counters.

```js
import * as Counter from 'Counter'

export function init () {
  return {
    counter1: Counter.init(),
    counter2: Counter.init()
  }
}
```

Notice how this component doesn't need to know what the state of a `Counter` is. It only needs to call `Counter.init` to get the initial state for each counter.

Next the component needs to handle actions to update each of the counters.

```js
export function update (state, action) {
  switch (action.type) {
    case 'COUNTER1':
      return state.update('counter1', counterState => Counter.update(counterState, action.$fwdAction))

    case 'COUNTER2':
      return state.update('counter2', counterState => Counter.update(counterState, action.$fwdAction))
  }
}
```

Since this component doesn't have any behaviour of its own, all it needs to do is delegate any actions to `Counter.update` and use the result to update the counter's state. The interesting part about this is `action.$fwdAction`. This is a special property which we will look at more in a minute.

Finally, this component needs a view.

```jsx
import { App } from 'plait'

const fwd = App.forwardDispatch

export function view (state, dispatch) {
  const c1State = state.get('counter1')
  const c2State = state.get('counter2')

  const c1Dispatch = fwd({ type: 'COUNTER1' }, dispatch, c1State)
  const c2Dispatch = fwd({ type: 'COUNTER2' }, dispatch, c2State)

  return (
    <div>
      {Counter.view(c1State, c1Dispatch)}
      {Counter.view(c2State, c2Dispatch)}
    </div>
  )
}
```

Similar to the `update` function, this component only needs to pass each counter's state to `Counter.view` and let the `Counter` component worry about doing the rendering.

In order to send actions from the `Counter` component to this component's `update` function, each counter needs a forwarder. This can be created with [`App.forwardDispatch`](../API/App.md#forwardDispatch). These forwarders will intercept any action from the `Counter` component and instead dispatch a new action directly to this component. The original action is stored in a special property, `$fwdAction`, so that it can be used later.
