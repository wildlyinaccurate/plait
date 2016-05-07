# Getting Started

## Skeleton app

The easiest way to get started with Plait is to clone the [Plait Skeleton App](https://github.com/wildlyinaccurate/plait-skeleton-app).

## Using npm

The recommended way to use Plait is with a CommonJS module loader like [Browserify](http://browserify.org/) or [webpack](https://webpack.github.io/). All of the examples in this documentation are written in [ES2015](http://babeljs.io/docs/learn-es2015/), which is recommended but not necessary.

```js
import Plait from 'plait'
import h from 'virtual-dom/h'

const app = Plait.start({ init, update, view })

Plait.render(document.getElementById('app'), app)

function init () {
  return { name: 'Plait' }
}

function update (state, action) {
  return state
}

function view (state, dispatch) {
  return h('p', `Hello, ${state.get('name')}!`)
}
```

To install Plait, run:

```
$ npm install --save plait
```

To bundle your application with Browserify:

```
$ npm install --save-dev babelify babel-preset-es2015
$ browserify -t [ babelify --presets [ es2015 ] ] main.js -o bundle.js
```

To bundle your application with webpack:

```
$ npm install --save plait babel-preset-es2015
$ webpack
```

To enable writing your Plait views with JSX, you should use something like [jsx-transform](https://github.com/alexmingoia/jsx-transform/).

## Without npm

It's still easy to use Plait without npm. Just take one of the [prebuilt Plait packages](https://github.com/wildlyinaccurate/plait/tree/master/dist) and include it in your page. You will also need to include [virtual-dom.js](https://github.com/Matt-Esch/virtual-dom/tree/master/dist) in order to render your views.

```jsx
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Hello, Plait!</title>
  </head>
  <body>
    <div id="app"></div>

    <script src="plait.js"></script>
    <script src="virtual-dom.js"></script>

    <script>
      var Component = {
        init: function () {
          return { name: 'Plait' }
        },

        update: function (state, action) {
          return state
        },

        view: function (state, dispatch) {
          return virtualDom.h('p', 'Hello, ' + state.get('name') + '!')
        }
      }

      var app = Plait.start(Component)

      Plait.render(document.getElementById('app'), app)
    </script>
  </body>
</html>
```

