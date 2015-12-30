import Zombie from 'zombie'

const nthOfType = (nth, className) => {
  return `:nth-of-type(${nth}) > .${className}`
}

module.exports = function () {
  this.Given(/^I am on the "([^"]+)" page$/, function (page) {
    this.browser = new Zombie()

    return this.browser.visit(`http://localhost:8888/${page}.html`)
  })

  this.When(/^I press the "([^"]+)" button$/, function (button) {
    return this.browser.pressButton(button)
  })

  this.When(/^I press the "([^"]+)" button (\d+) times?$/, function (button, times) {
    const n = Number(times)
    const ps = Array(n).fill(0).map(x => this.browser.pressButton(button))

    return Promise.all(ps)
  })

  this.When(/^I press the (\d+)(?:st|nd|rd|th) "([^"]+)" button$/, function (nth, className) {
    return this.browser.pressButton(nthOfType(nth, className))
  })

  this.When(/^I press the (\d+)(?:st|nd|rd|th) "([^"]+)" button (\d+) times?$/, function (nth, className, times) {
    const n = Number(times)
    const ps = Array(n).fill(0).map(x => this.browser.pressButton(nthOfType(nth, className)))

    return Promise.all(ps)
  })

  this.Then(/^the counter value should be "([^"]+)"$/, function (value) {
    return this.browser.assert.text('.counter__value', value)
  })

  this.Then(/^the (\d+)(?:st|nd|rd|th) counter value should be "([^"]+)"$/, function (nth, value) {
    return this.browser.assert.text(
      nthOfType(nth, 'counter__value'),
      value
    )
  })

  this.Then(/^I should see (\d+) counters?$/, function (count) {
    return this.browser.assert.elements('.counter', count)
  })
}
