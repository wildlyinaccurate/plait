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
    And I press the "Add Counter" button 3 times

    When I press the 1st "increment" button 3 times
    And I press the 2nd "decrement" button 5 times
    And I press the 3rd "increment" button 1 time

    Then the 1st counter value should be "3"
    Then the 2nd counter value should be "-5"
    Then the 3rd counter value should be "1"
