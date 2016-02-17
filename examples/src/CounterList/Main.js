import * as CounterList from './CounterList'

const appNode = plait.App.start(CounterList)

document.getElementById('app').appendChild(appNode)

document.querySelector('.description').innerHTML = `
    This page demonstrates a <a href="https://github.com/wildlyinaccurate/plait/blob/master/examples/src/CounterList/CounterList.js"><code>CounterList</code></a> component which is composed of <a href="https://github.com/wildlyinaccurate/plait/blob/master/examples/src/Counter/Counter.js"><code>Counter</code></a> components.
`
