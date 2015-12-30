Feature: Counter Component
  As a user
  I want to increment and decrement a counter
  Because I want to count something


  Scenario: Pressing buttons
    Given I am on the "Counter" page

    When I press the "+" button 3 times
    Then the counter value should be "3"

    When I press the "-" button
    Then the counter value should be "2"
