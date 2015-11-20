/**
 * Author: <%= devNames %>
 * <%= projectName %>
 */

// Create a closure to maintain scope of the '$' and <%= jsNamespace.toUpperCase() %>
;(function (<%= jsNamespace.toUpperCase() %><% if (includeJquery1 || includeJquery2) {%>, $<% } %>) {
<%
	if (includeJquery1 || includeJquery2) {%>
	$(function() {<%

	} %>
		<%= jsNamespace.toUpperCase() %>.Config.init();
	<%
	if (includeJquery1 || includeJquery2) {
	%>
	}); /* END DOC READY */<% } %>

	<%= jsNamespace.toUpperCase() %>.Config = {
		variableX : '', // please don't keep me - only for example syntax!

		init : function () {
			console.debug('Kickoff is running');
		}
	};

	// Example module
	/*
	<%= jsNamespace.toUpperCase() %>.MyExampleModule = {
		init : function () {
			<%= jsNamespace.toUpperCase() %>.MyExampleModule.setupEvents();
		},

		setupEvents : function () {
			//do some more stuff in here
		}
	};
	*/

})(window.<%= jsNamespace.toUpperCase() %> = window.<%= jsNamespace.toUpperCase() %> || {}<% if (includeJquery1 || includeJquery2) { %>, jQuery<% } %>);
