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
    describe('StateMachine', function() {
        var stm = new StateMachine();

        it('loads and defines without error', function() {
            expect(typeof stm).toEqual('object');
        });

        it('extends EventEmitter', function() {
            expect(typeof stm.emitEvent).toEqual('function');
        });
    });

    describe('getState', function() {
        var stm = new StateMachine();

        it('returns null with an undefined state', function() {
            expect(stm.getState()).toEqual(null);
        });

        it('returns null even if it is an empty string', function() {
            stm._state = '';
            expect(stm.getState()).toEqual(null);
        });

        it('returns null if the state is something silly like a number', function() {
            stm._state = 42; // The answer to life the universe and everything
            expect(stm.getState()).toEqual(null);
        });

        it('returns the string if the state is actually a good string', function() {
            stm._state = 'foo';
            expect(stm.getState()).toEqual('foo');
        });
    });

    // Run Jasmine
    jasmineEnv.execute();
});