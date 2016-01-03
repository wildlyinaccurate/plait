import { start } from 'App'
import * as RandomGifList from './RandomGifList'

const appNode = start(RandomGifList)

document.getElementById('app').appendChild(appNode)

document.querySelector('.description').innerHTML = `
    This page demonstrates a <a href="https://github.com/wildlyinaccurate/plait/blob/master/examples/src/RandomGifList/RandomGifList.js"><code>RandomGifList</code></a> component which is composed of <a href="https://github.com/wildlyinaccurate/plait/blob/master/examples/src/RandomGif/RandomGif.js"><code>RandomGif</code></a> components.
`
