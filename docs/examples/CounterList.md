# Dynamic List of Counters

* [See the demo](https://wildlyinaccurate.com/plait/examples/CounterList.html)
* [View the source code](https://github.com/wildlyinaccurate/plait/tree/master/examples/src/CounterList)

The CounterList example shows how small components can be composed to form larger components and eventually entire applications. It demonstrates:

* Component composition
* Event/action forwarding
* Advanced reactive data flow

The CounterList itself has a very simple state to keep track of the Counter components it contains.

```js
function init () {
  return {
    counters: []
  }
}
```

We can start off by handling an `ADD_COUNTER` action, which adds a new counter to the list.

```js
function update (state, action) {
  switch (action.type) {
    case 'ADD_COUNTER':
      return state.update('counters', cs => cs.concat(initializeComponent(Counter)))
  }
}
```

There is a new function here: `initializeComponent`. This function is provided by Plait and serves as a way of retrieving a component's initial state. It's important that you use `initializeComponent` instead of calling a component's `init` function directly, because `initializeComponent` wraps the initial value in a state container (among other things).

The CounterList view is quite straightforward. It creates an `Add Counter` button which dispatches the `ADD_COUNTER` event when clicked, and calls `Counter.view` for every counter in the list.

Note how rendering a Counter component is as simple as calling `Counter.view` with a state object and a dispatch function.

```jsx
function view (state, dispatch) {
  return (
    <div>
      <button ev-click={dispatch({ type: 'ADD_COUNTER' })}>
        Add Counter
      </button>

      {counterView(state, dispatch)}
    </div>
  )
}

function counterView (state, dispatch) {
  return state.get('counters').map((counterState) => {
    return Counter.view(counterState, dispatch)
  })
}
```

There's a problem with this, though: the `dispatch` function being passed into `Counter.view` is dispatching the Counters' actions to the CounterList's `update` function.

The CounterList's `update` function doesn't know how to deal with Counter actions, so we need to annotate these actions with some information that the CounterList can use to update the correct components. Plait provides a function called `forwardDispatch` which helps with that.

```js
function counterView (state, dispatch) {
  return state.get('counters').map((counterState, counterIdx) => {
    const modifiedDispatch = forwardDispatch(
      { type: 'MODIFY', counterIdx },
      dispatch,
      counterState
    )

    return Counter.view(counterState, modifiedDispatch)
  })
}
```

Now, whenever an action is dispatched from a Counter component, it will be sent as a `MODIFY` action containing the index of the Counter. The action will also have a special property, `$fwdAction`, containing the original action sent by the Counter.

Now the CounterList needs to handle the `MODIFY` action, and update its Counter components.

```js
function update (state, action) {
  switch (action.type) {
    case 'ADD_COUNTER':
      return state.update('counters', cs => cs.concat(initializeComponent(Counter)))

    case 'MODIFY':
      return state.update('counters', cs => cs.map(updateCounter(action)))
  }
}

function updateCounter (action) {
  return (counterState, idx) => {
    if (idx === action.counterIdx) {
      return Counter.update(counterState, action.$fwdAction)
    }

    return counterState
  }
}
```

Whenever the CounterList receives a `MODIFY` action, it applies the `updateCounter` function to each of its counters. This function finds the Counter at the right index, and updates that Counter's state by passing it and the original action directly to `Counter.update`.
