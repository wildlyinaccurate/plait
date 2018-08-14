import { render } from 'Static'

import startExampleApp from '../ExampleApp'
import * as StaticCounter from './StaticCounter'

const $qs = document.querySelector.bind(document)
const appNode = $qs('#app')
const description = `
  This page demonstrates a statically-rendered Counter component.
  When the <b>Bootstrap Counter</b> button is clicked, Plait will render a live Counter component.
`

$qs('.description').innerHTML = description

// Render the static component
const updater = (state, done) => done(state.set('count', 9999))

render(StaticCounter, updater).then(html => {
  appNode.innerHTML = html
})

// Bootstrap the live component
const btn = document.createElement('button')

btn.textContent = 'Bootstrap Counter'
btn.addEventListener('click', () => {
  btn.style.display = 'none'

  startExampleApp(
    StaticCounter,
    description
  )
})

appNode.parentNode.insertBefore(btn, appNode)
