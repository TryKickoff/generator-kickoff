/*
	Project: <%= projectName %>
	Authors: <%= devNames %>
*/

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
