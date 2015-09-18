/*
	test.js
	Example module to show how to include other JS files into you browserify build
*/

// dependencies for this module go here
// e.g. var $ = require('traversty')

function init() {
	doSomething();
}

function doSomething() {}

module.exports = init;
