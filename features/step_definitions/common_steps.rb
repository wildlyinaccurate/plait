Given(/^I am on the "([^"]*)" page$/) do |page|
  visit "#{page}.html"
end

When(/^I press the "([^"]*)" button$/) do |button|
  click_button button
end

When(/^I click the "([^"]*)" link$/) do |link|
  click_link link
end

When(/^I press the "([^"]*)" button (\d+) times?$/) do |button, n|
  n.to_i.times { click_button button }
end

When(/^I press the (\d+)(?:st|nd|rd|th) "([^"]*)" button$/) do |nth, className|
  click_nth_button(className, nth)
end

When(/^I press the (\d+)(?:st|nd|rd|th) "([^"]*)" button (\d+) times?$/) do |nth, className, times|
  times.to_i.times { click_nth_button(className, nth) }
end

When(/^I write "([^"]*)" into the input$/) do |value|
  first_input.set(value)
end

When(/^I hit enter$/) do
  first_input.native.send_keys(:return)
end
