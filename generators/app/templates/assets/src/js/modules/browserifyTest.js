/*
	test.js
	Example module to show how to include other JS files into you browserify build
*/

// dependencies for this module go here
var trak = require('trak.js');

function init() {
	doSomething();
}

function doSomething() {
	trak.event({category: 'category value', action: 'action value'});
}

module.exports = init;
