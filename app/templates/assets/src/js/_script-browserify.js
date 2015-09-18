/**
 * Project Name: <%= projectName %>
 * Client:
 * Author: <%= devNames %>
 * Company:
 */

'use-strict';

// npm modules
var ready = require('lite-ready');<%
if (jsLibs.indexOf('swiftclick') != -1) {%>
var SwiftClick = require('swiftclick');<% } %><%
if (jsLibs.indexOf('trak') != -1) {%>
var trak = require('trak.js');<% } %><%
if (jsLibs.indexOf('jquery1') != -1 || jsLibs.indexOf('jquery2') != -1) {%>
window.jQuery = window.$ = require('jquery');<% } %>


// Our own modules
// var browserifyTest = require('./modules/browserifyTest'); // this is a test module, uncomment to try it

// Bundle global libs that don't return a value
require('console');<%
if (shims === true) {%>require("./helpers/shims");<% } %>

// DOM ready code goes in here
ready(function () {<%
if (jsLibs.indexOf('trak') != -1) {%>
	trak.start();<% } %><%
if (jsLibs.indexOf('swiftclick') != -1) {%>
	var swiftclick = SwiftClick.attach(document.body);<% } %>

	// browserifyTest(); // this is a test, uncomment this line & the line above to try it
});
