<h1 align="center">Plait</h1>

<p align="center">
    A minimal JavaScript framework for building reactive web components. Heavily inspired by <a href="https://github.com/evancz/elm-architecture-tutorial/">The Elm Architecture</a> and Elm's <a href="https://github.com/evancz/start-app"><code>StartApp</code></a>.
</p>

<p align="center">
    <a href="https://travis-ci.org/wildlyinaccurate/plait">
        <img src="https://travis-ci.org/wildlyinaccurate/plait.svg?branch=master">
    </a>
</p>

## The Idea

I've been impressed with the experience of writing reactive apps in [Elm](http://elm-lang.org/). I wanted to find a way to achieve a similar architecture with a minimal amount of vanilla JavaScript.

In Plait, an app is composed of one or more encapsulated components. Each component implements `view`, which renders the component with a given state; `update`, which updates the state based on a given action; and `init`, which provides the initial state.

State is implemented as an immutable Map, and is contained & managed with [redux](https://github.com/rackt/redux). Components render their views with [virtual-dom](https://github.com/Matt-Esch/virtual-dom), with DOM events being transparently handled by [dom-delegator](https://github.com/Raynos/dom-delegator).

> **Note:** It's possible to write views in JSX and compile them to JS using [jsx-transform](https://github.com/alexmingoia/jsx-transform) with `factory: 'h'`. See below for an example.

## An Example Application

The following is an example of an application composed of a single counter component.

```js
import h from 'virtual-dom/h'
import { StartApp } from 'plait'

const appNode = StartApp.start({ init, update, view })

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
    <div className="counter">
      <button className="decrement" ev-click={dispatch({ type: 'DECREMENT' })}>-</button>
      <span className="counter__value">{state.get('count')}</span>
      <button className="increment" ev-click={dispatch({ type: 'INCREMENT' })}>+</button>
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
