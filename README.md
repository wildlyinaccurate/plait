<h1 align="center">Reactive Playground</h1>

<p align="center">
    Just a little repository for me to play around with some reactive components. Heavily inspired by <a href="https://github.com/evancz/elm-architecture-tutorial/">The Elm Architecture</a> and Elm's <a href="https://github.com/evancz/start-app"><code>StartApp</code></a>.
</p>

## The Idea

I've been impressed with the experience of writing reactive apps in [Elm](http://elm-lang.org/). I wanted to find a way to achieve a similar architecture with a minimal amount of vanilla JavaScript.

In this project, an app is composed of one or more encapsulated components. Each component implements `view`, which renders the component with a given state; `update`, which updates the state based on a given action; and `init`, which provides the initial state.

Components render their views with [virtual-dom](https://github.com/Matt-Esch/virtual-dom), with DOM events being transparently handled by [dom-delegator](https://github.com/Raynos/dom-delegator). State is contained and managed with [redux](https://github.com/rackt/redux).

## License

The MIT License (MIT)

Copyright (c) 2016 Joseph Wynn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
