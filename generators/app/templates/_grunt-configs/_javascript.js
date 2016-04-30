module.exports.tasks = {
	/**
	 * Browserify
	 * https://github.com/jmreidy/grunt-browserify
	 * Grunt task for node-browserify – allows CommonJS-style JS code and packages it for use in the browser
	 */
	browserify: {
		main: {
			src: ['<%%=config.js.srcFile%>'],
			dest: '<%%=config.js.distDir%><%%=config.js.distFile%>',
			options : {
				browserifyOptions : {
					debug: true,
					fullPaths: false
				},
				plugin: [
					['minifyify', {
						output: '<%%=config.js.distDir%>script.map',
						map: 'script.map'
					}]
				],
				watch: true
			}
		}
	},<%

	if (includeShims) { %>
	/**
	 * Shimly
	 * https://github.com/nicbell/shimly
	 * Load in a base set of JS shims for use in a project
	 */
	shimly: {
		// things you would like to shim (an array of items from the list above)
		shim: ['EventListener', 'Element.classList'],

		// output location (relative to your grunt.js file location)
		dest: '<%%=config.srcDir%>/js/standalone/shims.js',

		// minify the output (true or false)
		minify: true
	}<% } %>
};
