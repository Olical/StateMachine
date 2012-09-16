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
        it('loads and defines without error', function() {
            var stm = new StateMachine();
            expect(typeof stm).toEqual('object');
        });

        it('extends EventEmitter', function() {
            var stm = new StateMachine();
            expect(typeof stm.emitEvent).toEqual('function');
        });

        it('accepts an initial state', function() {
            var stm = new StateMachine({
                initialState: 'foo'
            });
            expect(stm.getState()).toEqual('foo');
        });

        it('accepts initial listeners', function() {
            var check = null;
            var stm = new StateMachine({
                listeners: {
                    '>foo': function() {
                        check = 100;
                    }
                }
            });
            stm.setState('foo');
            expect(check).toEqual(100);
        });

        it('accepts initial listeners and a state which executes the listeners', function() {
            var check = null;
            var stm = new StateMachine({
                listeners: {
                    '>foo': function() {
                        check = 100;
                    }
                },
                initialState: 'foo'
            });
            expect(check).toEqual(100);
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

    describe('setState', function() {
        it('sets the state to a string', function() {
            var stm = new StateMachine();
            expect(stm.getState()).toEqual(null);
            stm.setState('foo');
            expect(stm.getState()).toEqual('foo');
        });

        it('triggers the right events on the initial setting', function() {
            var stm = new StateMachine();
            var check = '';
            stm.addListeners({
                '>': function() {
                    check += 'a';
                },
                'bar>foo': function() {
                    check += 'b';
                },
                '>foo': function() {
                    check += 'c';
                },
                'foo>': function() {
                    check += 'd';
                }
            });
            stm.setState('foo');
            expect(check).toEqual('c');
        });

        it('triggers the right events on the second (or more) setting', function() {
            var stm = new StateMachine();
            var check = '';
            stm.addListeners({
                '>': function() {
                    check += 'a';
                },
                'bar>foo': function() {
                    check += 'b';
                },
                '>foo': function() {
                    check += 'c';
                },
                'foo>': function() {
                    check += 'd';
                },
                'foo>bar': function() {
                    check += 'e';
                },
                '>bar': function() {
                    check += 'f';
                }
            });
            stm.setState('foo');
            expect(check).toEqual('c');
            check = '';
            stm.setState('bar');
            expect(check).toEqual('edf');
        });

        it('returns the current instance for chaining', function() {
            var stm = new StateMachine();
            expect(stm.setState('foo')).toEqual(stm);
        });

        it('passes arguments along to listeners', function() {
            var stm = new StateMachine();
            var check = 0;
            stm.addListener('>foo', function(a, b, c) {
                check += a + b + c;
            });
            stm.setState('bar').setState('foo', [100, 200, 150]);
            expect(check).toEqual(450);
        });
    });

    // Run Jasmine
    jasmineEnv.execute();
});