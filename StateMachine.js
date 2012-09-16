/**
 * StateMachine v0.0.0 - git.io/stm
 * Oliver Caldwell
 * MIT license
 */

;(function(exports) {
    // This is a variable that either contains the native Object.create method
    // Or a custom polyfill from Douglass Crockford
    // It is used in prototypical inheritance
    var createObject = Object.create || function(o) {
        function F(){}
        F.prototype = o;
        return new F();
    };

    /**
     * Builds the class and returns it to be exposed as you wish
     *
     * @param {Function} EventEmitter Event class required by this class for extension, you decide how to load it, AMD/script tag etc
     * @return {Function} This will be the build StateMachine class to be exposed either via AMD or the global object
     */
    function construct(EventEmitter) {
        /**
         * Constructor for the StateMachine class, this is what you instantiate
         * It does not do anything, it is just here for its prototype object
         */
        function StateMachine(){}

        // This is a shortcut to the prototype to save time and bytes
        // This line also extends the EventEmitter class using createObject
        // It copies the EventEmitter prototype into its own
        // This is prototypical inheritance in action
        var proto = StateMachine.prototype = createObject(EventEmitter.prototype);

        /**
         * Simply fetches the current state name string and returns it
         * If there is no current state it will return null
         *
         * @return {String|Object} The state name as a string or null if there is none set (null is technically an object)
         */
        proto.getState = function() {
            return typeof this._state === 'string' ? this._state : null;
        };

        // Now we pass the finished class back down the chain
        // Another part of the code then exposes it in the correct way
        return StateMachine;
    }

    // We need to build the StateMachine class using the construct function
    // This construction will occur differently depending on the existence of AMD
    if(typeof define === 'function' && define.amd) {
        // In this case, AMD is present on the page
        // We will assume (if wrong, I'm sorry) that the script is being loaded with it
        // So we should load EventEmitter from the components directory via AMD too
        define(['./components/eventEmitter/EventEmitter.js'], construct);
    }
    else {
        // Without AMD on the page they must load EventEmitter manually
        // Which also means StateMachine must be built and exposed manually
        // So we use the global EventEmitter instance and drop StateMachine into the global object too
        exports.StateMachine = construct(EventEmitter);

        // If the dependency is not met the user will probably get an undefined warning
    }
}(this));