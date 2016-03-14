/**
 * Project Name: <%= projectName %>
 * Client:
 * Author: <%= devNames %>
 * Company:
 */

'use-strict';

// npm modules
import ready from 'lite-ready';<%

if (includeSwiftclick) {%>
import SwiftClick from 'swiftclick';<%
}

if (includeTrak) {%>
import trak from 'trak.js';<%
}

if (includeJquery1 || includeJquery2) {%>
window.jQuery = window.$ = require('jquery');<% } %>

// Bundle global libs that don't return a value
import 'console';

// Add your project-specific modules here
//import moduleTest from './modules/moduleTest';

// DOM ready code goes in here
ready(function () {<%
if (includeSwiftclick) {%>
	const swiftclick = SwiftClick.attach(document.body);
	swiftclick.useCssParser(true);<% }

	if (includeTrak) {%>
	trak.start();<% } %>

	// browserifyTest(); // this is a test, uncomment this line & the line above to try it
});
