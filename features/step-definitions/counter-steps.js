import { nthElement } from './utils'

module.exports = function () {
  this.Then(/^the counter value should be "([^"]+)"$/, function (value) {
    return this.browser.assert.text('.counter__value', value)
  })

  this.Then(/^the (\d+)(?:st|nd|rd|th) counter value should be "([^"]+)"$/, function (nth, value) {
    return this.browser.assert.text(
      nthElement(this.browser, nth, 'counter__value'),
      value
    )
  })

  this.Then(/^I should see (\d+) counters?$/, function (count) {
    return this.browser.assert.elements('.counter', count)
  })
}
