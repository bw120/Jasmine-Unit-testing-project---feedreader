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
                //check if url is defined
                expect(allFeeds[i].url).toBeDefined(); 
                //check if it is a string
                expect(allFeeds[i].url).toEqual(jasmine.any(String)); 
                //check if it has the http in it to confirm it is likely a URL.
                //should also work with https
                var hasHttp = allFeeds[i].url.indexOf('http');
                expect(hasHttp).toBeGreaterThan(-1); 
            }
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('each has a name defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                //check to see if name is defined
                expect(allFeeds[i].name).toBeDefined(); 
                //check if value is a string
                expect(allFeeds[i].name).toEqual(jasmine.any(String));
                //check that string is not empty
                expect(allFeeds[i].name.length).not.toBe(0);
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
            //check that the menu-hidden class is applied. This makes the menu not visible
            expect($('body').hasClass('menu-hidden')).toBe(true); 
            //check that the position is off screen
            expect(position.left).toBeLessThan(-150); 
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

            //get actual position of menu
            var position = [];
            position[0] = $('.feed-list').offset(); 

            //record whether menu has initial CSS class that hides
            var cssClass = []; 
            cssClass[0] = $('body').hasClass('menu-hidden'); 


                //trigger the click then wait for animation and then check if menu is visible
                $('.menu-icon-link').trigger('click');

                //wait for animation then record values
                setTimeout(function() {
                    position[1] = $('.feed-list').offset();
                    cssClass[1] = $('body').hasClass('menu-hidden');
   
                    //trigger the click then wait for animation and then check if menu is visible
                    $('.menu-icon-link').trigger('click');
                    setTimeout(function() {
                        position[2] = $('.feed-list').offset();
                        cssClass[2] = $('body').hasClass('menu-hidden');


                        //check that postion changes on click
                        expect(position[0].left).not.toBe(position[1].left);
                        //check that position is positive and has moved on screen
                        expect(position[1].left).toBeGreaterThan(0);
                        //check that position returns to original hidden position on second click
                        expect(position[0].left).toBe(position[2].left);

                        //check if CSS class "menu-hidden" is assigned
                        expect(cssClass[0]).toBe(true);
                        expect(cssClass[1]).toBe(false);
                        expect(cssClass[2]).toBe(true);
                        
                        done();

                    }, 300);
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
            loadFeed(1, done);
        });

        it("has at least one .entry element in the .feed container", function() {
            var items;
            console.log(items.html());
            expect(items.length).toBeGreaterThan(0); //check that there is at least one
            expect($(items[0]).hasClass("entry")).toBe(true); //check to make sure it has .entry class
        });
    });

    /* A test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * loadFeed() is asynchronous.
     */
    describe('New Feed Selection', function() {

        //content from first feed
        var items1;
        //content from second feed 
        var items2; 

        //Get the initial values of the content and then run loadFeed()
        beforeEach(function(done) {
            //get initial html of article entry
            items1 = $(".feed a").children().html();

            //load new feed
            loadFeed(2, done);
        });


        //load a different feed then save the content into a variable and compare to the previous feed.
        it("content changed when a new feed is loaded", function() {
            //get html of article entry after feed has loaded
            items2 = $(".feed a").children().html();

            //compare the content before and after loading feed
            expect(items1).not.toBe(items2); 
        });
    });

}());
