Feature: Static Counter Component
  As a user
  I want to increment and decrement a counter
  Because I want to count something

  Scenario: Pressing buttons
    Given I am on the "StaticCounter" page
    Then the counter value should be "9999"
    When I press the "+" button
    Then the counter value should be "9999"

    When I press the "Bootstrap Counter" button
    Then the counter value should be "0"

    When I press the "+" button
    Then the counter value should be "1"

    When I press the "-" button 2 times
    Then the counter value should be "-1"

    When I press the "+" button 3 times
    Then the counter value should be "2"
