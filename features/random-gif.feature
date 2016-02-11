Feature: RandomGif Component
  As a user
  I want to see funny cat gifs
  Because I am bored

  Scenario: Looking at a gif
    Given I am on the "RandomGif" page
    Then there should be a new cat gif

    When I press the "More Please!" button
    Then there should be a new cat gif
