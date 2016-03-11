/**
 * Project Name: <%= projectName %>
 * Client:
 * Author: <%= devNames %>
 * Company:
 */

'use-strict';

// npm modules
var ready = require('lite-ready');<%

if (includeSwiftclick) {%>
var SwiftClick = require('swiftclick');<%
}

if (includeTrak) {%>
var trak = require('trak.js');<%
}

if (includeJquery1 || includeJquery2) {%>
window.jQuery = window.$ = require('jquery');<% } %>


// Our own modules
// var browserifyTest = require('./modules/browserifyTest'); // this is a test module, uncomment to try it

// Bundle global libs that don't return a value
require('console');

// DOM ready code goes in here
ready(function () {<%
if (includeSwiftclick) {%>
	var swiftclick = SwiftClick.attach(document.body);<% }
if (includeTrak) {%>
	trak.start();<% } %>

	// browserifyTest(); // this is a test, uncomment this line & the line above to try it
});
