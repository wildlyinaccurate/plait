import { start } from 'StartApp'
import * as Counter from './Counter'

const appNode = start(Counter)

document.getElementById('app').appendChild(appNode)

document.querySelector('.description').innerHTML = `
    This page demonstrates a single <a href="https://github.com/wildlyinaccurate/plait/blob/master/examples/src/Counter/Counter.js"><code>Counter</code></a> component.
`
