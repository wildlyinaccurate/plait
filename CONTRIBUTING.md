# Contributing to Plait

Contributions of any size are always welcome.

## General workflow

 * Tests should be written for any new functionality.
 * Small pull requests containing a single commit are preferred.
 * Pull requests should not contain changes to anything in the `dist/` directory.

## Directory Structure

 * `src/` contains the JavaScript source files
 * `lib/` contains the automatically-generated ES5 code
 * `dist/` contains the automatically-generated [Browserify](http://browserify.org/) web browser bundle
 * `test/` contains unit tests for the source files
 * `features/` contains integration tests which are run against the example applications
 * `examples/` contains the example applications
    * `examples/src/` contains the JavaScript source files for each example
    * `examples/dist/` contains the copiled example applications which are published to [plait.js.org](https://plait.js.org/)
 * `docs/` contains the MarkDown source files for [plait.js.org](https://plait.js.org/)

## Building Plait

After making changes to the JavaScript files in `src/`, Plait can be built by running:

```
npm run build
```

## Running tests locally

Running the integration tests requires a local web server on port 8888. The root of the web server must be in `examples/dist/`. On most systems, an ad-hoc web server can be started by running:

```
cd examples/dist/
python -m SimpleHTTPServer 8888
```

Then in a separate terminal, the tests can be run with:

```
npm run test
```

Alternatively, [Travis CI](https://travis-ci.org/wildlyinaccurate/plait/) will run the tests automatically when you open a pull request.
