import { elementsWithContent } from './utils'

module.exports = function () {
  this.Then(/^I should see a "([^"]+)" todo$/, function (name, done) {
    const todos = elementsWithContent(this.browser, '.view label', name)

    if (todos.length !== 1) {
      throw new Error(`Expected to see 1 "${name}" todo but there were ${todos.length}.`)
    }

    done()
  })
}
