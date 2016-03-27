Then(/^I should see (\d+) counters?$/) do |n|
  sleep(0.1)
  expect(all('.counter').length).to be(n.to_i)
end

Then(/^the counter value should be "([^"]*)"$/) do |value|
  sleep(0.1)
  expect(page).to have_css('.counter__value', text: value)
end

Then(/^the (\d+)(?:st|nd|rd|th) counter value should be "([^"]*)"$/) do |nth, value|
  sleep(0.1)
  element = nth_element('counter__value', nth)

  expect(element.text).to eq(value)
end
