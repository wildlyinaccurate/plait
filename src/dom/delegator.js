import DOMDelegator from 'dom-delegator/dom-delegator'

import events from './events'


export function listen () {
  const delegator = new DOMDelegator()

  events.forEach(event => delegator.listenTo(event))
}
