Feature: Example feature
  As a user
  I want to increment and decrement a counter
  So that I can memorise a linear number sequence

  Scenario: Pressing buttons
    Given I am on the counter app page
    When I press the "+" button 3 times
    Then the counter value should be "3"
    And I press the "-" button
    Then the counter value should be "2"
