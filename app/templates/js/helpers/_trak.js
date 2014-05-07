/* ==========================================================================
   <%= jsNamespace.toUpperCase() %>.Trak - Universal event tracking API

   # Default implementation uses is Google Analytics:
   https://developers.google.com/analytics/devguides/collection/analyticsjs/

   ## Page and event tracking
   https://developers.google.com/analytics/devguides/collection/analyticsjs/events

   ### Usage:
   <%= jsNamespace.toUpperCase() %>.Trak.event('category', 'action');
   <%= jsNamespace.toUpperCase() %>.Trak.event('category', 'action', 'label');
   <%= jsNamespace.toUpperCase() %>.Trak.event('category', 'action', 'label', value); // value is a number
   <%= jsNamespace.toUpperCase() %>.Trak.event('category', 'action', 'label', value, nonInteraction); // nonInteraction is an integer

   ### Example:
   <%= jsNamespace.toUpperCase() %>.Trak.event('help', 'tool_dl', this.title);
   ========================================================================== */
;(function(<%= jsNamespace.toUpperCase() %>) {
	<%= jsNamespace.toUpperCase() %>.Trak = {
		clean : function(str) {
			return str.toString().replace(/\s|'|"/g, '_').toLowerCase();
		},

		event : function (category, action, label, value, nonInteraction) {
			value = 0 || value;
			nonInteraction = 0 || nonInteraction;

			if (typeof(ga) !== 'undefined') { // use _gaq for old style
				ga('send', 'event', this.clean(category), this.clean(action), this.clean(label), value, {'nonInteraction': nonInteraction});

				// Old style:
				//_gaq.push(['_trackEvent', this.clean(category), this.clean(action), this.clean(label), value]);
			}
		}
	};
})(window.<%= jsNamespace.toUpperCase() %> = window.<%= jsNamespace.toUpperCase() %> || {});
