# Counter

* [See the demo](https://wildlyinaccurate.com/plait/examples/Counter.html)
* [View the source code](https://github.com/wildlyinaccurate/plait/tree/master/examples/src/Counter)

The Counter example is a very simple component which demonstrates:

* Basic reactive data flow
* Event handling

The component's state only keeps track of a single `count` value.

```js
function init () {
  return {
    count: 0
  }
}
```

The component handles two actions: `DECREMENT`, which decreases the value of `count` by 1; and `INCREMENT`, which increases the value of `count` by 1.

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

The view contains the value of `count`, and two buttons which dispatch the `DECREMENT` and `INCREMENT` actions when they are clicked.

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
