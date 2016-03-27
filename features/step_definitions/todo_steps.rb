Then(/^I should see a "([^"]*)" todo$/) do |value|
  expect(page).to have_css('.view label', text: value)
end

Then(/^I should not see a "([^"]*)" todo$/) do |value|
  expect(page).to have_no_css('.view label', text: value)
end

When(/^I create some todos$/) do
  input = find('.new-todo')

  input.set('First Todo')
  input.native.send_keys(:return)

  input.set('Second Todo')
  input.native.send_keys(:return)
end

Then(/^the todo count should say "([^"]*)"$/) do |value|
  expect(page).to have_css('.todo-count', text: value)
end

When(/^I mark the (\d+)(?:st|nd|rd|th) todo as complete$/) do |nth|
  click_nth_button('toggle', nth)
end
