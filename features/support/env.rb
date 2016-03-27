require 'capybara'
require 'capybara/cucumber'
require 'capybara/poltergeist'
require 'capybara/rspec'

HOST = 'http://localhost:8888'

Capybara.app = HOST
Capybara.app_host = HOST

Capybara.default_driver = :poltergeist
Capybara.javascript_driver = :poltergeist

Capybara.register_driver :poltergeist do |app|
  Capybara::Poltergeist::Driver.new(app, {
    js_errors: true
  })
end

def first_input
  all('input').select { |i| i[:type] == 'text' }.first
end

def click_nth_button(className, nth)
  button = all(".#{className}", :visible => :all)[nth.to_i - 1]
  button.trigger('click')
end
