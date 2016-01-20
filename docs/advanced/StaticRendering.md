# Static Rendering

It is sometimes desirable to render a component as static HTML, for example to render an application with some initial state while data is being fetched. This can be achieved using Plait's `Static` utility.

```js
import { render } from 'plait/lib/Static'
import MyComponent from 'my-component'

const html = render(MyComponent)
```

By default, the component will be rendered with the state from its `init` function. It is also possible to modify a component's state before rendering it. This is done by passing an updater function to `Static.render`.

The updater is a function which takes the component's initial state and a callback. Once the updater has finished, it should call the callback with the updated state.

```js
import { render } from 'plait/lib/Static'
import MyComponent from 'my-component'

const updater = (state, done) => {
  fetch('/api/items')
    .then(response => response.json())
    .then(data => {
      done(state.set('items', data.items))
    })
}

render(MyComponent, updater).then(html => {
  // Do something with the static HTML
})
```
