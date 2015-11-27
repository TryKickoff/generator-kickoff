## [Yeoman](http://yeoman.io) generator for the [Kickoff framework](https://github.com/TryKickoff/kickoff/)
[![stability][stability-image]][stability-url]
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]

[stability-image]: https://img.shields.io/badge/stability-stable-brightgreen.svg?style=flat-square
[stability-url]: https://nodejs.org/api/documentation.html#documentation_stability_index
[npm-image]: https://img.shields.io/npm/v/generator-kickoff.svg?style=flat-square
[npm-url]: https://npmjs.org/package/generator-kickoff
[downloads-image]: http://img.shields.io/npm/dm/budo.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/generator-kickoff


Using our Yeoman Generator is the best and fastest way to get Kickoff each time you want to start a new project. It will ask you a few questions and then build a custom version of [Kickoff version 6](https://github.com/TryKickoff/kickoff/releases/tag/6.0.0) for your needs.

## What is Yeoman?
Yeoman helps you kickstart new projects, prescribing best practices and tools to help you stay productive. Yeoman is open-source but is maintained by a number of people from Google.

We have created a generator that once installed, allows you to create a custom build of Kickoff whenever you need.

## Installation

### Install Yeoman
If you haven't installed Yeoman yet, run this command in your terminal:

```shell
npm install -g yo
```

### Install the generator
To install generator-kickoff from npm, run:

```shell
npm install -g generator-kickoff
```

### Install them both :)
```shell
npm install -g yo generator-kickoff
```

Finally, initiate the generator:

```shell
yo kickoff
```

## The Kickoff generator asks for this information:
1. Project name
1. Description
1. Developer's names?
1. Features
 1. Does this project support IE8?
 1. Include Kickoff's styleguide?
 1. Use Kickoff [Statix](/kickoff/statix/) for static templating and rapid prototyping?
 1. Use Grunticon?
1. Use Browserify to bundle your Javascript?
1. Choose your javascript namespace (only seen if above question is false)
1. Which javascript libraries would you like to use? 
 1. jQuery v1.x
 1. jQuery v2.x
 1. trak.js - Universal event tracking API
 1. Swiftclick - Eliminates the 300ms click event delay on touch devices
 1. Include some Javascript polyfills/shims? (These are generated by the `grunt shimly` command)
 1. Use Modernizr?

The repo and more information can be found at [github.com/TryKickoff/generator-kickoff](https://github.com/TryKickoff/generator-kickoff)

If you'd like to get to know Yeoman better check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

[MIT License](http://trykickoff.mit-license.org)
