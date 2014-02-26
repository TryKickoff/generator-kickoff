/* ==========================================================================
   KO.Trak - Universal event tracking API

   # Default implementation uses is Google Analytics:
   https://developers.google.com/analytics/devguides/collection/analyticsjs/

   ## Page and event tracking
   https://developers.google.com/analytics/devguides/collection/analyticsjs/events

   ### Usage:
   <%= jsNamespace.toUpperCase() %>.Trak.event('category', 'action');
   <%= jsNamespace.toUpperCase() %>.Trak.event('category', 'action', 'label');
   <%= jsNamespace.toUpperCase() %>.Trak.event('category', 'action', 'label', value); // value is a number
   ========================================================================== */
;(function(<%= jsNamespace.toUpperCase() %>) {
	<%= jsNamespace.toUpperCase() %>.Trak = {
		clean : function(str) {
			return str.toString().replace(/\s|'|"/g, '-');
		},

		event : function (category, action, label, value) {
			if (typeof(ga) !== 'undefined') { // use _gaq for old style
				ga('send', 'event', this.clean(category), this.clean(action), this.clean(label), value);

				// Old style:
				//_gaq.push(['_trackEvent', this.clean(category), this.clean(action), this.clean(label), value]);
			}
		}
	};
})(window.<%= jsNamespace.toUpperCase() %> = window.<%= jsNamespace.toUpperCase() %> || {});
