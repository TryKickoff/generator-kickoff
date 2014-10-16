/*
	Project: <%= projectName %>
	Authors: <%= devNames %>
*/
<% if (browserify === true) {%>
// --------------------------------------------- //
// DEFINE GLOBAL LIBS                            //
// --------------------------------------------- //
// Uncomment the line below to expose jQuery as a global object to the usual places
// window.jQuery = window.$ = require('./libs/jquery/jquery-1.10.2.js');

// force compilation of global libs that don't return a value.
require("./helpers/log");
<% if (shims === true) {%>
require("./helpers/shims");
<% } %>

//initialise KO object
var KO = {};

KO.Config = {
	variableX : '', // please don't keep me - only for example syntax!

	init : function () {
		console.debug('Kickoff is running');

		// Example module include
		KO.UI = require('./modules/UI');
		KO.UI.init();
	}
};

KO.Config.init();

<% } else { %>

// Create a closure to maintain scope of the '$' and <%= jsNamespace.toUpperCase() %>
;(function (<%= jsNamespace.toUpperCase() %><% if (jsLibs.indexOf('jquery1') != -1 || jsLibs.indexOf('jquery2') != -1) {%>, $<% } %>) {

	<% if (jsLibs.indexOf('jquery1') != -1 || jsLibs.indexOf('jquery2') != -1) {%>$(function() {<% } %>

		<%= jsNamespace.toUpperCase() %>.Config.init();

	<% if (jsLibs.indexOf('jquery1') != -1 || jsLibs.indexOf('jquery2') != -1) {%>});<% } %>



	<%= jsNamespace.toUpperCase() %>.Config = {
		variableX : '', // please don't keep me - only for example syntax!

		init : function () {
			console.debug('Kickoff is running');
		}
	};

	// Example module
	/*
	<%= jsNamespace.toUpperCase() %>.Ui = {
		init : function() {
			<%= jsNamespace.toUpperCase() %>.Ui.modal();
		},

		modal : function() {

		}
	};
	*/


})(window.<%= jsNamespace.toUpperCase() %> = window.<%= jsNamespace.toUpperCase() %> || {}<% if (jsLibs.indexOf('jquery1') != -1 || jsLibs.indexOf('jquery2') != -1) { %>, jQuery<% } %>);
<% } %>
