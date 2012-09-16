# StateMachine

## JavaScript state machine that just works

It's pretty obvious that this class is an implementation of a [state machine](https://en.wikipedia.org/wiki/Finite-state_machine) written in JavaScript. The main difference between this one and the many others out there is that it is built on top of my [EventEmitter](https://github.com/Wolfy87/EventEmitter) class. EventEmitter a is ridiculously fast, small and well tested event library that runs on pretty much every browser and JavaScript platform. It is also ready to load via AMD.

## Getting the source

There are a few ways you can get a copy of StateMachine. The most obvious would be to download `StateMachine.js` from this repository and load it into your page alongside [`EventEmitter.js`](https://github.com/Wolfy87/EventEmitter). You could do that with a script tag pretty easily.

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

## License (MIT)

Copyright (c) 2012 Oliver Caldwell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.