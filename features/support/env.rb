require 'capybara'
require 'capybara/cucumber'
require 'capybara/poltergeist'
require 'capybara/rspec'

HOST = 'http://localhost:8888'

Capybara.app_host = HOST
Capybara.default_max_wait_time = 5

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

def nth_element(className, nth)
  find(:xpath, "(//*[@class='#{className}'])[#{nth}]", :visible => :all)
end

def click_nth_button(className, nth)
  nth_element(className, nth).trigger('click')
end
