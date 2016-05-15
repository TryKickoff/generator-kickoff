/**
 * Grunt tasks:
 * - grunt                   : The default task. Alias for `grunt serve` task below
 * - grunt serve             : watch files and run a static server
 * - grunt watcher           : watch files without static server
 * - grunt compile           : compile scss, js & compress images
 * - grunt compile --release : same as above, but compress CSS as well
 * - grunt styleguide        : shortcut to preview the styleguide
 * - grunt images            : compress all images
 * - grunt test              : run jshint and scsslint
 */

module.exports = function (grunt) {
	'use strict';

	require('time-grunt')(grunt); // Record how long tasks take

	var options = {
		pkg: require('./package'), // <%%=pkg.name%>
		<%
		if (statix) { %>
		site: grunt.file.readYAML('statix/src/data/site.yml'),<%
		} %>

		// Global Grunt vars. Edit this file to change vars
		config : require('./_grunt-configs/config.js')
	};

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt, {pattern: ["grunt-*"<%
		if (statix) {
			%>, "assemble"<%
		}%>
	]});


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
		'watch',
	]);


	// grunt watcher
	grunt.registerTask('watcher', [
		'compile',
		'watch',
	]);


	// grunt compile
	grunt.registerTask('compile', [
		'browserify',
		'postscss',
		'images',<%
		if (statix) {%>
		'copy:statix',
		'assemble',<%
		} %><%
		if (shims) {%>,
		'shimly',<%
		} %><%
		if (modernizr || shims) {%>
		'copy:jsStandalone',<%
		} %>
	]);


	// grunt start
	grunt.registerTask('start', function() {
		var opn = require('opn');
		opn('http://trykickoff.com/learn/checklist.html');
	});<%

	if (styleguide) { %>


	// grunt styleguide
	grunt.registerTask('styleguide', [
		'compile',
		'browserSync:styleguide',
		'watch',
	]);<%
	} %>


	// grunt images
	grunt.registerTask('images', [
		'newer:imagemin:images',
	]);


	/**
	 * grunt test
	 */
	grunt.registerTask('test', [
		'eslint',
		'scsslint',
	]);
};
