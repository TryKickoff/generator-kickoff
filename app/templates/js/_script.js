/*
	Project: <%= projectName %>
	Authors: <%= devNames %>
*/

// Create a closure to maintain scope of the '$' and <%= jsNamespace %>
<% if (jsLibs == 'jquery' || jsLibs == 'micro') {%>
;(function (<%= jsNamespace %>, $) {
	<% if (jsLibs == 'micro') {%>/* ==========================================================================
	   Micro libraries
	   * Bean    : Events API          - https://github.com/fat/bean
	   * Bonzo   : DOM utility         - https://github.com/ded/bonzo
	   * Qwery   : CSS Selector engine - https://github.com/ded/qwery
	   * domReady: Obvious             - https://github.com/ded/domready
	   * lodash  : Utility library     - http://lodash.com/

	   * Ajax not included. Consider adding https://github.com/ded/Reqwest
	     bower install reqwest
	   ========================================================================== */<% } %>
<% } else { %>
;(function (<%= jsNamespace %>) {
<% } %>

	<% if (jsLibs == 'jquery') {%>$(function() {<% } else if(jsLibs == 'micro') { %>domready(function () {<% } %>
		// Any globals go here in CAPS (but avoid if possible)

		// follow a singleton pattern
		// (http://addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternjavascript)

		<%= jsNamespace %>.Config.init();

	});// END DOC READY


	<%= jsNamespace %>.Config = {
		variableX : '', // please don't keep me - only for example syntax!

		init : function () {
			console.debug('Kickoff is running');
		}
	};

	// Example module
	/*
	<%= jsNamespace %>.Ui = {
		init : function() {
			<%= jsNamespace %>.Ui.modal();
		},

		modal : function() {

		}
	};
	*/

<% if (jsLibs == 'micro') {%>
})(window.<%= jsNamespace %> = window.<%= jsNamespace %> || {}, bonzo);
<% } else if (jsLibs == 'jquery') { %>
})(window.<%= jsNamespace %> = window.<%= jsNamespace %> || {}, jQuery);
<% } else { %>
})(window.<%= jsNamespace %> = window.<%= jsNamespace %> || {});
<% } %>
