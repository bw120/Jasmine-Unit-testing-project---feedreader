/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('each has a URL defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined(); //check if url is defined
                expect(allFeeds[i].url).toEqual(jasmine.any(String)); //check if it is a string
                expect(allFeeds[i].url.split('/')).toContain("http:"); //check if it hs the http: in it to confirm it is likely a URL.
            }
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('each has a name defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined(); //check to see if name is defined
                expect(allFeeds[i].name).toEqual(jasmine.any(String)); //check if value is a string
            }
        });
    });


    /* Menu tests */
    describe('The menu', function() {
        /* A test that ensures the menu element is
         * hidden by default.
         */
        it('Menu set to hidden by default', function() {
            var position = $('.menu').offset();
            expect($('body').hasClass('menu-hidden')).toBe(true); //check that the menu-hidden class is applied. This makes the menu not visible
            expect(position.left).toBeLessThan(-150); //check that the position is off screen
        });

        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
        */

        //Since the test is actually checking the position of the menu and the css uses animation to hide/show the menu
        //I am using a setTimeout and done() to allow time for the animation to run
        //before checking the final values to confirm it changed.

        it('Menu menu changes visibility on click', function(done) {

            //record the intial values of the menue
            var position1 = $('.feed-list').offset(); //get position
            var initVal = $('body').hasClass('menu-hidden'); //record whether menu has initial CSS class that hides

            //trigger the click
            $('.menu-icon-link').trigger('click'); 

            //wait for the animation and then call done
            setTimeout(function() {
                //get final values
                var position2 = $('.feed-list').offset(); //get position
                var finalVal = $('body').hasClass('menu-hidden'); //record if it has the class after the trigger
                
                //check if initial value was hidden to confirm that when you check position coordinates that it should be negative number
                if (initVal === true) {
                    var pos1 = position1;
                    var pos2 = position2;
                } else {
                    var pos1 = position2;
                    var pos2 = position1;
                }

                //compare the values
                expect(initVal).not.toBe(finalVal); // test if both values are different
                expect(pos1.left).toBeLessThan(-150);
                expect(pos2.left).toBeGreaterThan(0);
                done();

                //trigger click again just to get the menu out of the way so it doesn't cover up test results
                $('.menu-icon-link').trigger('click'); 

            }, 300);
        });
    });
    
    /* A test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * loadFeed() is asynchronous so this test wil require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
    describe('Initial Entries', function() {

        //loads a feed and then wait for it to be done before testing
        beforeEach(function(done) {
            loadFeed(1, function() {done();}); //uses done() to make sure ajax request is complete before moving on
        });

         it("has at least one .entry element in the .feed container", function() {
            var feed;
            var items;

            feed = $(".feed").children();
            items = $(feed).children(); //get children of the .feed
            expect(items.length).toBeGreaterThan(0); //check that there is at least one
            expect($(items[0]).hasClass("entry")).toBe(true); //check to make sure it has .entry class
 
         });
    });

    /* A test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * loadFeed() is asynchronous.
     */
    describe('New Feed Selection', function() {

        var selector = 0; //selects which feed to load
        var items1; //content from first feed
        var items2; //content from second feed

        //for each test it increases selector to load a different feed
        beforeEach(function(done) {
            selector++; 
            loadFeed(selector, function() {done();});
        });

        //load a feed then save the content into a variable
        it("initial content has loaded", function() {
            var item;
            item = $(".feed").children();
            items1 = $(item).children();
            expect(items1).toBeDefined();
        });
        
        //load a different feed then save the content into a variable and compare to the previous feed.
        it("content changed when a new feed is loaded", function() {
            var item;
            item = $(".feed").children();
            items2 = $(item).children();
            expect($(items1).html()).not.toBe($(items2).html()); //compare the content of both feeds. Should be different
        });
    });
   
}());
