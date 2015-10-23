##Javascript Testing - Feedreader

# System requirements
* A computer with a current web browser

# To Run
* Open the index.html file in the browser. The Jasmine test results appear at the bottom of the screen. 
* The actual javascript test code is written in the file jasmine/spec/feedreader.js

# Project Overview

For this project, I was given a web-based application that reads RSS feeds. Only the first test came supplied. I had to write the subsequent tests using Jasmine to check the functionality of the various features of the app. The test were built to ensure that future feature development doesn't break any existing features. 

# Tests

The following test were written to complete this project
 1. A test that loops through each feed to make sure it has a URL defined.
 2. A test that checks that each feed has a name defined.
 3. A test that checks that the menu is set to hidden by default. This test checks both the CSS class and the actual position on the screen.
 4. A test that triggers a click on the menu icon and then checks to ensure that the visibility changes once it is clicked. This checks both the CSS and the actual postion on the screen. It is built so that it waits for the animation to complete before it checks the final position of the menue.
 5. This test ensures that once the loadFeed() function runs that there is at least one article entry is displayed on screen. It checks the contents of the .feed container to ensure that there is one element with .entry class. loadFeed() is asynchronous and so it needs to account for the delay caused by pulling the article info from the API.
 6. A test to ensure that when a new feed is loaded through loadFeed() the content on the page actually changes. It compares the HTML before and after the feed is loaded.