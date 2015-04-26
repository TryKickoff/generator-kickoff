/*	Author: <%= devNames %>
		<%= projectName %>
*/

// --------------------------------------------- //
// DEFINE GLOBAL LIBS                            //
// --------------------------------------------- //
<% if (jsLibs.indexOf('jquery1') != -1 || jsLibs.indexOf('jquery2') != -1) {%>window.jQuery = window.$ = require('../../../node_modules/jquery/dist/jquery.js');
<% } else { %>// Uncomment the line below to expose jQuery as a global object to the usual places
// window.jQuery = window.$ = require('../../../node_modules/jquery/dist/jquery.js');
<% } %>

// force compilation of global libs that don't return a value.
require("./helpers/log");
<% if (shims === true) {%>require("./helpers/shims");<% } %>

//initialise <%= jsNamespace.toUpperCase() %> object
var <%= jsNamespace.toUpperCase() %> = {};

<%= jsNamespace.toUpperCase() %>.Config = {

	init : function () {
		console.debug('Kickoff is running');

		// Example module include
		<%= jsNamespace.toUpperCase() %>.UI = require('./modules/UI');
		<%= jsNamespace.toUpperCase() %>.UI.init();
	}
};


KO.Config.init();
