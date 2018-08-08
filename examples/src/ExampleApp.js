import { start, render } from 'App'

import raf from 'raf'

export default function startExampleApp (app, description) {
  const $qs = document.querySelector.bind(document)
  const appNode = start(app, raf)

  $qs('.description').innerHTML = description

  render(appNode, $qs('#app'))
}
