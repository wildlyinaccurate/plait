# [Plait](https://plait.js.org/)

Plait is a minimal JavaScript framework for building isomorphic reactive web components. It is loosely based on <a href="https://github.com/evancz/elm-architecture-tutorial/">The Elm Architecture</a> and Elm's <a href="https://github.com/evancz/start-app"><code>StartApp</code></a>.

[![build status](https://img.shields.io/travis/wildlyinaccurate/plait/master.svg?style=flat-square)](https://travis-ci.org/wildlyinaccurate/plait)
[![npm version](https://img.shields.io/npm/v/plait.svg?style=flat-square)](https://www.npmjs.com/package/plait)
[![dependency status](http://img.shields.io/david/wildlyinaccurate/plait.svg?style=flat)](http://david-dm.org/wildlyinaccurate/plait)
![stability-unstable](https://img.shields.io/badge/stability-unstable-yellow.svg)

## The Basic Idea

Inspired by the experience of writing reactive applications in [Elm](http://elm-lang.org/), Plait is an attempt at achieving a similar application architecture with a minimal amount of JavaScript.

In Plait, an application is composed of one or more encapsulated components. A component is made up of 3 functions: `init`, which provides the component's initial state; `view`, which renders the component at a given state and attaches actions to the UI elements; and `update`, which modifies the component's state based on actions dispatched from the UI.

Component state is implemented as an immutable map. Behind the scenes, the state is contained & managed by [Redux](https://github.com/rackt/redux). A component's `update` function is just a Redux [reducer](http://rackt.org/redux/docs/basics/Reducers.html).

Component views are written in [virtual-hyperscript](https://github.com/Matt-Esch/virtual-dom/blob/master/virtual-hyperscript/README.md) and rendered by [virtual-dom](https://github.com/Matt-Esch/virtual-dom). DOM events are transparently handled by [dom-delegator](https://github.com/Raynos/dom-delegator).

With minimal effort, component views can be written in JSX and compiled to virtual-hyperscript using [jsx-transform](https://github.com/alexmingoia/jsx-transform).

## An Example Application

The following is an example of an application composed of a single counter component. [View the demo](https://plait.js.org/examples/Counter.html)

> _Note: For more complex example applications, see [the Plait documentation](https://plait.js.org/docs/examples/index.html)._

```jsx
import h from 'virtual-dom/h'
import { App } from 'plait'

const appNode = App.start({ init, update, view })

document.getElementById('app').appendChild(appNode)

function init () {
  return {
    count: 0
  }
}

function update (state, action) {
  switch (action.type) {
    case 'DECREMENT':
      return state.update('count', x => x - 1)

    case 'INCREMENT':
      return state.update('count', x => x + 1)
  }
}

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

## License

The MIT License (MIT)

Copyright (c) 2016 Joseph Wynn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
