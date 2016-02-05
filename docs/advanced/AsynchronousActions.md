# Asynchronous Actions

Components can perform asynchronous actions by dispatching a [thunk](https://en.wikipedia.org/wiki/Thunk) instead of an action object.

## What's a thunk?

A thunk is just a function which can dispatch an action. You can do anything you like inside the function, and dispatch the action at any point. Some common use cases are:

* Fetching data asynchronously
* Performing animations
* Setting timeouts

Thunks take two arguments:

* `dispatch` (Function) - a regular dispatcher function.
* `getState` (Function) - a function which returns the current state of the component

## Examples

Below are some examples of how to use asynchronous actions. The [RandomGif example](../examples/RandomGif.md) also makes use of asynchronous actions.

### Wait before dispatching an action

```jsx
// Thunks can be dispatched in the normal way from view()
function view (state, dispatch) {
  return <button ev-click={hello()}>Hello!</button>
}

// The thunk can dispatch a regular action object
function hello () {
  return dispatch => {
    setTimeout(() => {
      dispatch({ type: 'HELLO' })
    }, 1000)
  }
}
```

### Fetching data before dispatching an action

```jsx
// Use dispatch() in the view to dispatch a thunk
function view (state, dispatch) {
  return (
    <button ev-click={dispatch(getGifs())}>
      Get another GIF!
    </button>
  )
}

// Return a thunk which fetches some data, builds an action from the response,
// and then dispatches that action
function getGifs () {
  return dispatch => {
    fetch('https://api.giphy.com/v1/gifs/random')
      .then(response => response.json())
      .then(response => dispatch(receiveGif(response)))
  }
}

// Create a plain action object out of the response
function receiveGif (response) {
  return {
    type: 'RECEIVE_GIF',
    url: response.data.fixed_height_small_url
  }
}
```

> **Note**: Under the hood, Plait uses [Thunk middleware for Redux](https://github.com/gaearon/redux-thunk) to enable asynchronous actions.
