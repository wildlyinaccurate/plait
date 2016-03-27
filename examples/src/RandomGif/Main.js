import startExampleApp from '../ExampleApp'
import { init, update, view } from './RandomGif'

startExampleApp(
  { init: init('funny cats'), update, view },
  `This page demonstrates a single <a href="https://github.com/wildlyinaccurate/plait/blob/master/examples/src/RandomGif/RandomGif.js"><code>RandomGif</code></a> component.`
)
