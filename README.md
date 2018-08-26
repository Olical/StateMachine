# StateMachine

## JavaScript state machine that just works

It's pretty obvious that this class is an implementation of a [state machine](https://en.wikipedia.org/wiki/Finite-state_machine) written in JavaScript. The main difference between this one and the many others out there is that it is built on top of my [EventEmitter](https://github.com/Wolfy87/EventEmitter) class. EventEmitter a is ridiculously fast, small and well tested event library that runs on pretty much every browser and JavaScript platform. It is also ready to load via AMD.

## How to use it

Just in case the heavily commented source is not enough, this section should help you get going with the script.

### Listening to changes in the state

StateMachine extends [EventEmitter](https://github.com/Wolfy87/EventEmitter) to provide [ridiculously fast](http://jsperf.com/eventemitter-3-vs-4/7#results) and [well tested](https://github.com/Wolfy87/EventEmitter/blob/master/tests/tests.js) event management. You can follow the EventEmitter [guide](https://github.com/Wolfy87/EventEmitter/blob/master/docs/guide.md) and [API documentation](https://github.com/Wolfy87/EventEmitter/blob/master/docs/api.md) to learn all about the event management EventEmitter provides.

You can then easily apply that knowledge to this script because the event methods are exactly the same, it's just about listening for specialised events. The events you can listen to on a state machine are as follows.

> *In place of "FROM" and "TO" you would put your state names...*

 * `FROM>TO` - This is emitted when the state changes *from* the specified state *to* the other specified state.
 * `FROM>` - This is emitted whenever the state changes *from* the specified state. It does not matter what it is changing to.
 * `>TO` - This is emitted whenever the state changes *to* the specified state. It does not matter what it was before.
 * `changed` - Every time the state changes this event is emitted. It passes the original and new states to any listeners attached to it.

The events are actually emitted in the order found above. As you will already know from the EventEmitter documentation, you can listen to these events like this.

    var stm = new StateMachine();
    
    stm.addListener('foo>bar', function() {
        console.log('State changed from foo to bar.');
    });

### Changing the state

To change the state you simply execute the `setState` method with a single string argument which is what you want the state to change to. When executed the state value will update and then the events will be fired. Here's a quick example.

    var stm = new StateMachine();
    
    stm.addListener('>foo', function() {
        console.log('State changed to foo.');
    });
    
    stm.setState('foo');

You can also pass arguments to the listeners as you would with EventEmitter.

    var stm = new StateMachine();
    
    stm.addListener('>foo', function(a, b) {
        console.log(a + b);
    });
    
    stm.setState('foo', [10, 20]);

And if you really want to, you can chain state changes.

    stm
        .setState('foo', [10, 20])
        .setState('bar')
        .setState('foo', [50, 60]);

### Getting the current state

You can use the aptly named `getState` method to get the current state. If there is no current state then it will return `null`.

    var stm = new StateMachine();
    stm.getState(); // null
    stm.setState('foo');
    stm.getState(); // 'foo'

## Getting the source

There are a few ways you can get a copy of StateMachine. The most obvious would be to download `StateMachine.js` from this repository and load it into your page alongside `EventEmitter.js`. You could do that with a script tag pretty easily.

    <script type='text/javascript' src='EventEmitter.js'></script>
    <script type='text/javascript' src='StateMachine.js'></script>

Simple right? That will work perfectly and do everything you need it to. *But* you can take it a step further and use [Bower](https://github.com/twitter/bower) to download StateMachine and EventEmitter, then RequireJS (or any other AMD loader) to load them into your page. To install the package with Bower you can use the following line.

    bower install stateMachine

Yep, that's it. That will fetch StateMachine and EventEmitter as a dependency and place them both in the `components` directory of your project. With that all in place you can load StateMachine with AMD and it will load EventEmitter automatically!

    define([
        './components/stateMachine/StateMachine'
    ], function(StateMachine) {
        var stm = new StateMachine(),
            mindBlown = true;
    });

When loading with this method you don't even pollute the global namespace. Everything is passed around with AMD, so no `window.*` values. If you skip AMD and use a script tag it will place it and EventEmitter in the global namespace though. This is `window` in browsers and `exports` in environments such as [node.js](http://nodejs.org/).

### A note on dependencies

You will see a few other dependencies come down with the Bower package, but don't panic. EventEmitter is the only real dependency of the script, the others are used for testing among other things in the repository itself. They are not loaded at any point when using StateMachine.

### Fetching the dependencies in a submodule or clone

You may wish to download the source will git and download the dependencies later. You can still use Bower for this, simply run `bower install` whilst inside the StateMachine directory. It will run along and fetch all packages the repository requires to do it's thing.

## Testing

Tests are performed using [Jasmine](https://jasmine.github.io/) in the following browsers via [BrowserStack](http://www.browserstack.com/).

 * Firefox
 * Chrome
 * Opera
 * Safari
 * IE6+

There should not be any bugs in the releases, well, that's what I am aiming for anyway. However, if you do spot a bug please add it as an [issue](https://github.com/Wolfy87/StateMachine/issues) and I will fix it as soon as possible.

## License (MIT)

Copyright (c) 2012 Oliver Caldwell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
