define(['../StateMachine'], function(StateMachine) {
    // Set up the Jasmine environment
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function(spec) {
        return htmlReporter.specFilter(spec);
    };

    // Configure the tests
    describe('core', function() {
        it('loads and defines without error', function() {
            var stm = new StateMachine();
            expect(typeof stm).toEqual('object');
        });
    });

    // Run Jasmine
    jasmineEnv.execute();
});