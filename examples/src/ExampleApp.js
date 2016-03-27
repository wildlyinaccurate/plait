import { start } from 'App'

import es5 from 'es5-shim'
import es6 from 'es6-shim'
import raf from 'raf'

export default function startExampleApp (app, description) {
  const $qs = document.querySelector.bind(document)

  $qs('#app').appendChild(start(app, raf))
  $qs('.description').innerHTML = description
}
