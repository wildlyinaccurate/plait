Feature: TodoMVC App
  As a user
  I want to track my tasks
  Because I like to be organised

  Scenario: Creating Todos
    Given I am on the "TodoMVC" page

    When I write "Learn Plait   " into the input
    And I hit enter
    Then I should see a "Learn Plait" todo

    When I write "Write a TodoMVC App" into the input
    And I hit enter
    Then I should see a "Write a TodoMVC App" todo

  Scenario: Completing Todos
    Given I am on the "TodoMVC" page

    When I create some todos
    Then the todo count should say "2 items left"

    When I mark the 1st todo as complete
    Then the todo count should say "1 item left"

  Scenario: Removing Todos
    Given I am on the "TodoMVC" page
    And I create some todos

    When I press the 2nd "destroy" button
    Then I should see a "First Todo" todo
    But I should not see a "Second Todo" todo

  Scenario: Filtering Todos
    Given I am on the "TodoMVC" page
    And I create some todos

    When I mark the 2nd todo as complete
    And I press the "Active" button
    Then I should see a "First Todo" todo
    But I should not see a "Second Todo" todo

    When I press the "Completed" button
    Then I should see a "Second Todo" todo
    But I should not see a "First Todo" todo

    When I press the "All" button
    Then I should see a "First Todo" todo
    And I should see a "Second Todo" todo

  Scenario: Clearing Completed Todos
    Given I am on the "TodoMVC" page
    And I create some todos

    When I mark the 2nd todo as complete
    And I press the "Clear completed" button
    Then I should see a "First Todo" todo
    But I should not see a "Second Todo" todo
