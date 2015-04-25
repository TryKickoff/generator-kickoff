module.exports = function (grunt) {
	'use strict';

	var options = {
		pkg: require('./package'), // <%%=pkg.name%>

		<% if (statix == true) {%>site: grunt.file.readYAML('statix/src/data/site.yml'),<% } %>

		// Global Grunt vars. Edit this file to change vars
		config : require('./_grunt-configs/config.js')
	};

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt, {pattern: ["grunt-*", "chotto"<% if (statix === true) {%>, "assemble"<% } %>]});

	// Load grunt configurations automatically
	var configs = require('load-grunt-configs')(grunt, options);

	// Define the configuration for all the tasks
	grunt.initConfig(configs);


	/* ==========================================================================
		Available tasks:
		* grunt            : run jshint, uglify and sass:kickoff
		* grunt watch      : run sass:kickoff, uglify and livereload
		* grunt dev        : run jshint, uglify and sass:kickoff
		* grunt deploy     : run jshint, uglify, sass:kickoff and csso
		* grunt serve      : watch js & scss and run a local server
		* grunt start      : run this before starting development
		* grunt icons      : generate the icons. uses svgmin and grunticon
		* grunt checks     : run jshint
		* grunt styleguide : watch js & scss, run a local server for editing the styleguide
		 ========================================================================== */

	/**
	 * GRUNT * Default task
	 * run jshint, uglify and sass:kickoff
	 */
	// Default task
	grunt.registerTask('default', [
		<% if (shims === true) {%>'shimly',<% } %>
		<% if (statix === true) {%>'clean:all',<% } %>
		<% if (browserify === true) {%>
		'newer:browserify:prod',
		<% } else { %>
		'dofilesexist:js',
		'uglify',
		<% } %>
		'sass:kickoff',
		'autoprefixer:kickoff'
		<% if (statix === true) {%>
		,'copy',
		'assemble'
		<% } %>
	]);


	/**
	 * GRUNT DEV * A task for development
	 * run jshint, uglify and sass:kickoff
	 */
	grunt.registerTask('dev', [
		<% if (shims === true) {%>'shimly',<% } %>
		<% if (statix === true) {%>'clean:all',<% } %>
		<% if (browserify === true) {%>
		'newer:browserify:dev',
		<% } else { %>
		'dofilesexist:js',
		'uglify',
		<% } %>
		'sass:kickoff',
		'autoprefixer:kickoff'
		<% if (statix === true) {%>
		,'copy',
		'assemble'
		<% } %>
	]);


	/**
	 * GRUNT DEPLOY * A task for your production environment
	 * run jshint, uglify and sass:production
	 */
	grunt.registerTask('deploy', [
		<% if (shims === true) {%>'shimly',<% } %>
		<% if (statix === true) {%>'clean:all',<% } %>
		<% if (browserify === true) {%>
		'newer:browserify:prod',
		<% } else { %>
		'dofilesexist:js',
		'uglify',
		<% } %>
		'sass:kickoff',
		'autoprefixer:kickoff',
		'csso'
		<% if (statix === true) {%>
		,'copy',
		'assemble'
		<% } %>
	]);


	/**
	 * GRUNT SERVE * A task for for a static server with a watch
	 * run connect and watch
	 */
	grunt.registerTask("serve", [
		<% if (shims === true) {%>'shimly',<% } %>
		<% if (statix === true) {%>'clean:all',<% } %>
		<% if (browserify === true) {%>
		'newer:browserify:prod',
		<% } else { %>
		'dofilesexist:js',
		'uglify',
		<% } %>
		'sass:kickoff',
		'autoprefixer:kickoff',
		<% if (statix === true) {%>
		'copy',
		'assemble',
		<% } %>
		'browserSync:serve',
		'watch'
	]);


	/**
	 * GRUNT START * Run this to
	 * run jquery builder, uglify, sass and autoprefixer
	 */
	grunt.registerTask('start', [
		<% if (shims === true) {%>'shimly',<% } %>
		<% if (statix === true) {%>'clean:all',<% } %>
		<% if (browserify === true) {%>
		'newer:browserify:prod',
		<% } else { %>
		'dofilesexist:js',
		'uglify',
		<% } %>
		'sass:kickoff',
		'sass:styleguide',
		'autoprefixer:kickoff',
		'autoprefixer:styleguide',
		<% if (statix === true) {%>
		'copy',
		'assemble',
		<% } %>
		'connect:start',
		'watch'
	]);


	/**
	 * GRUNT STYLEGUIDE * A task for the styleguide
	 * run uglify, sass:kickoff, sass:styleguide, autoprefixer:kickoff, autoprefixer:styleguide, connect:styleguide & watch
	 */
	grunt.registerTask('styleguide', [
		<% if (shims === true) {%>'shimly',<% } %>
		'dofilesexist:js',
		<% if (browserify === true) {%>
		'newer:browserify:prod',
		<% } else { %>
		'uglify',
		<% } %>
		'sass:styleguide',
		'autoprefixer:styleguide',
		<% if (statix === true) {%>
		'copy',
		'assemble',
		<% } %>
		'connect:styleguide',
		'watch'
	]);


	/**
	 * GRUNT ICONS * A task to create all icons using grunticon
	 * run clean, svgmin and grunticon
	 */
	grunt.registerTask('icons', [
		'clean:icons',
		'svgmin',
		'grunticon'
	]);


	/**
	 * GRUNT CHECKS * Check code for errors
	 * run jshint
	 */
	grunt.registerTask('checks', [
		'jshint:project',
		'scsslint'
	]);

	/**
	 * GRUNT DOFILESEXIST * Check for the existence of specific files and fail if not found
	 */
	grunt.registerMultiTask('dofilesexist', function () {

		var filePaths = this.data;
		var numFailedFiles = 0;

		if (Array.isArray(filePaths)) {

			filePaths.forEach(function(path) {

				if (!grunt.file.exists(path))
				{
					grunt.log.warn("Source file: '" + path + "' not found.");
					numFailedFiles++;
				}
			});

			if (numFailedFiles > 0) grunt.fail.warn("Please add the missing files.");
		}
	});



};
