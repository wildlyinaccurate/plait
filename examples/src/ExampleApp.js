import { start, render } from 'plait'

import es6 from 'es6-shim'

export default function startExampleApp (app, description) {
  const $qs = document.querySelector.bind(document)
  const appNode = start(app)

  $qs('.description').innerHTML = description

  render(appNode, $qs('#app'))
}
