Feature: TodoMVC App
  As a user
  I want to track my tasks
  Because I like to be organised

  Scenario: Managing Todos
    Given I am on the "TodoMVC" page

    When I write "Learn Plait   " into the input
    And I hit enter
    Then I should see a "Learn Plait" todo

    When I write "Write a TodoMVC App" into the input
    And I hit enter
    Then I should see a "Write a TodoMVC App" todo
