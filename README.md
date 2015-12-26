<h1 align="center">Reactive Playground</h1>

<p align="center">
    Just a little repository for me to play around with some reactive components. Heavily inspired by <a href="https://github.com/evancz/elm-architecture-tutorial/">The Elm Architecture</a> and Elm's <a href="https://github.com/evancz/start-app"><code>StartApp</code></a>.
</p>

## The Idea

I've been impressed with the experience of writing reactive apps with [Elm](http://elm-lang.org/). I wanted to find a way to achieve similar architecture with a minimal amount of vanilla JavaScript.

In this project, an app is composed of one or more encapsulated components. Each component implements `view`, which renders the component with a given state; `update`, which updates the state based on a given action; and `init`, which provides the initial state.

Components render their views with [virtual-dom](https://github.com/Matt-Esch/virtual-dom), with DOM events being transparently handled by [dom-delegator](https://github.com/Raynos/dom-delegator). State is contained and managed with [redux](https://github.com/rackt/redux).
