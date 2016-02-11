import { elementsWithContent, nthElement } from './utils'

module.exports = function () {
  this.Then(/^I should( not)? see a "([^"]+)" todo$/, function (not, name, done) {
    const todos = elementsWithContent(this.browser, '.view label', name)
    const expectedElements = not ? 0 : 1

    if (todos.length !== expectedElements) {
      throw new Error(`Expected to see 1 "${name}" todo but there were ${todos.length}.`)
    }

    done()
  })

  this.When(/^I mark the (\d+)(?:st|nd|rd|th) todo as complete$/, function (nth) {
    return this.browser.pressButton(nthElement(this.browser, nth, 'toggle'))
  })
}
