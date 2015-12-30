Feature: CounterList Component
  As a user
  I want to create lots of counters
  Because I have so many things to count


  Scenario: Creating counters
    Given I am on the "CounterList" page
    When I press the "Add Counter" button
    Then I should see 1 counter

    When I press the "Add Counter" button 2 times
    Then I should see 3 counters

  Scenario: Pressing buttons
    Given I am on the "CounterList" page
    And I press the "Add Counter" button

    When I press the "+" button 3 times
    Then the counter value should be "3"

    When I press the "-" button
    Then the counter value should be "2"
