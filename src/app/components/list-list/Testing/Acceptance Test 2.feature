Feature: View all venue list
Scenario: Venue list page is opened
    Given The user clicks on the list button
    When The button is clicked 
	Then The webpage should change to the Venue list page
	And Display all of the 20 available venues

