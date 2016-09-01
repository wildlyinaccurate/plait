import { start, render } from 'app'

import es5 from 'es5-shim'
import es6 from 'es6-shim'
import raf from 'raf'

export default function startExampleApp (app, description) {
  const $qs = document.querySelector.bind(document)
  const appNode = start(app, raf)

  $qs('.description').innerHTML = description

  render(appNode, $qs('#app'))
}
