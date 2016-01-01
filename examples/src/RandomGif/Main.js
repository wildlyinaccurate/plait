import { start } from 'StartApp'
import { init, update, view } from './RandomGif'

const appNode = start({
  init: init('funny cats'),
  update,
  view
})

document.getElementById('app').appendChild(appNode)

document.querySelector('.description').innerHTML = `
    This page demonstrates a single <a href="https://github.com/wildlyinaccurate/plait/blob/master/examples/src/RandomGif/RandomGif.js"><code>RandomGif</code></a> component.
`
