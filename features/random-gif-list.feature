Feature: RandomGifList Component
  As a user
  I want to see potentially infinite funny animal gifs
  Because I am infinitely bored


  Scenario: Creating lots of gifs
    Given I am on the "RandomGifList" page


    When I write "cats" into the input
    And I hit enter
    Then there should be a new cat gif

    When I press the "More Please!" button
    Then there should be a new cat gif
    And there should be 2 total requests for "cats" gifs

    When I hit enter
    Then there should be 3 total requests for "cats" gifs

    When I write "dogs" into the input
    And I hit enter
    Then there should be 1 total requests for "dogs" gifs

    When I press the 2nd "more" button
    Then there should be 4 total requests for "cats" gifs
