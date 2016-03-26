Then(/^I should see (\d+) counters?$/) do |n|
  expect(all('.counter').length).to be(n.to_i)
end

Then(/^the counter value should be "([^"]*)"$/) do |value|
  expect(page).to have_css('.counter__value', text: value)
end

Then(/^the (\d+)(?:st|nd|rd|th) counter value should be "([^"]*)"$/) do |nth, value|
  element = all('.counter__value')[nth.to_i - 1]

  expect(element.text).to eq(value)
end
