module.exports.tasks = {<%
	if (browserify) {
	%>/**
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
	} else { %>
	/**
	 * Uglify
	 * https://github.com/gruntjs/grunt-contrib-uglify
	 * Minifies and concatinates your JS
	 * Also creates source maps
	 */
	uglify: {
		options: {
			// set to false (replace this object) to turn off mangling
			// https://github.com/gruntjs/grunt-contrib-uglify#reserved-identifiers
			<%
				// if jquery is chosen in the generator, exclude it from uglify
				if (includeJquery1 || includeJquery2) {
			%>mangle: {
				except: ['jQuery']
			},<%
				} else {
			%>mangle: true,<%
				}
			%>
			compress: { // set to false (replace this object) to turn off compression
				drop_console: false
			},

			beautify: false, // beautify: beautify your code for debugging/troubleshooting purposes
			// report: 'gzip', // report: Show file size report
			sourceMap: '<%%=config.js.distDir%><%%=config.js.distFile%>.map',
			sourceMappingURL: '/<%%=config.js.distFile%>.map',
		},
		js: {
			nonull: true,
			src: '<%%=config.js.fileList%>',
			dest: '<%%=config.js.distDir%><%%=config.js.distFile%>'
		}
	},<%
	}

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
