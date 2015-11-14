/**
 * Grunt tasks:
 * - grunt                   : The default task. Alias for `grunt serve` task below
 * - grunt serve             : watch files and run a static server
 * - grunt watcher           : watch files without static server
 * - grunt compile           : compile scss, js & compress images
 * - grunt compile --release : same as above, but compress CSS as well
 * - grunt icons             : generate the icons using grunticon
 * - grunt images            : compress all non-grunticon images & then run `grunt icons`
 */

var opn = require('opn')

module.exports = function (grunt) {
	'use strict';

	var options = {
		pkg: require('./package'), // <%%=pkg.name%>

		<% if (statix) {
			%>site: grunt.file.readYAML('statix/src/data/site.yml'),<%
		} %>

		// Global Grunt vars. Edit this file to change vars
		config : require('./_grunt-configs/config.js')
	};

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt, {pattern: ["grunt-*"<%
		if (!browserify) {
			%>, "chotto"<%
		}
		%><%
		if (statix) {
			%>, "assemble"<%
		}
	%>]});


	// Load grunt configurations automatically
	var configs = require('load-grunt-configs')(grunt, options);

	// Define the configuration for all the tasks
	grunt.initConfig(configs);


	/**
	 * The tasks
	 */

	// grunt
	grunt.registerTask('default', ['serve']);


	// grunt serve
	grunt.registerTask('serve', [
		'compile',
		'browserSync:serve',
		'watch'
	])


	// grunt watcher
	grunt.registerTask('watcher', [
		'compile',
		'watch'
	]);


	// grunt compile
	grunt.registerTask('compile', [<%
		if (browserify) {%>
		'browserify',<%
		} else { %>
		'chotto:js',
		'uglify',<%
		} %>
		'postscss',
		'images'<%
		if (statix) {%>
		'copy:statix',
		'assemble'<%
		} %><%
		if (shims) {%>,
		'shimly'<%
		} %><%
		if (modernizr) {%>,
		'copy:modernizr'<%
		} %>
	]);


	// grunt start
	grunt.registerTask('start', function() {
		opn('http://trykickoff.com/learn/checklist.html');
	});<%
	if (styleguide) { %>


	// grunt styleguide
	grunt.registerTask('styleguide', [
		'compile',
		'browserSync:styleguide',
		'watch'
	]);<%
	} %>


	// grunt images
	grunt.registerTask('images', [
		'newer:imagemin:images'<%
		if (grunticon) {%>,
		'icons'<% } %>
	]);<%
	if (grunticon) {%>


	// grunt icons
	grunt.registerTask('icons', [
		'clean:icons',
		'newer:imagemin:grunticon',
		'grunticon'
	]);<% } %>


	// grunt travis
	grunt.registerTask('travis', [
		'postscss'
	]);

};
