/*
	Project: <%= projectName %>
	Authors: <%= devNames %>
*/

// Create a closure to maintain scope of the '$' and <%= jsNamespace.toUpperCase() %>
;(function (<%= jsNamespace.toUpperCase() %><% if (jsLibs == 'jquery') {%>, $<% } %>) {

	<% if (jsLibs == 'jquery') {%>$(function() {<% } %>

		<%= jsNamespace.toUpperCase() %>.Config.init();

	<% if (jsLibs == 'jquery') {%>});<% } %>



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



})(window.<%= jsNamespace.toUpperCase() %> = window.<%= jsNamespace.toUpperCase() %> || {}<% if (jsLibs == 'jquery') { %>, jQuery<% } %>);
