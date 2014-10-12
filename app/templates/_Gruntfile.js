module.exports = function (grunt) {
	'use strict';

	var options = {
		pkg: require('./package'), // <%%=pkg.name%>

		<% if (statix == true) {%>site: grunt.file.readYAML('statix/src/data/site.yml'),<% } %>

		/**
		 * Grunt global vars
		 * Many of the Grunt tasks use these vars
		 */
		config : {
			src : '_grunt-configs/*.js',

			css : {
				distDir : 'css',     // <%%=config.css.distDir%>
				srcFile : 'kickoff', // <%%=config.css.srcFile%>
				scssDir : 'scss'     // <%%=config.css.scssDir%>
			},

			js : {
				distDir  : 'js/dist/',   // <%%=config.js.distDir%>
				distFile : 'app.min.js', // <%%=config.js.distFile%>

				// <%%=config.js.fileList%>
				fileList : [
					// if you would like to remove jQuery from your concatenated JS, comment out the line below
					<% if (jsLibs.indexOf('jquery1') != -1 || jsLibs.indexOf('jquery2') != -1) {%>'js/bower/jquery/dist/jquery.js',<% } %>

					<% if (shims === true) {%>'js/helpers/shims.js',<% } %>


					'js/helpers/console.js',
					<% if (jsLibs.indexOf('swiftclick') != -1) {%>'js/bower/swiftclick/js/libs/swiftclick.js',<% } %>
					<% if (jsLibs.indexOf('trak') != -1) {%>'js/bower/trak/dist/trak.js',<% } %>
					<% if (jsLibs.indexOf('cookies') != -1) {%>'js/bower/cookies-js/src/cookies.js',<% } %>

					'js/script.js'
				]
			},

			localserver: 'kickoff.dev', // <%%=config.localserver%>

			testing: {
				visual : {
					sizes: [ '600', '1000', '1200' ], // <%%=config.testing.visual.sizes%>

					// <%%=config.testing.visual.urls%>
					urls : [
						'http://localhost:3000',
						'http://localhost:3000/_docs/',
						'http://localhost:3000/_docs/styleguide.html'
					]
				}
			}<% if (statix === true) {%>,

			statix : {
				dir : 'statix' // <%%= config.statix.dir%>
			}<% } %>
		},
	};

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Load grunt configurations automatically
	var configs = require('load-grunt-configs')(grunt, options);
	<% if (statix === true) {%>grunt.loadNpmTasks('assemble');<% } %>

	// Define the configuration for all the tasks
	grunt.initConfig(configs);


	/* ==========================================================================
		Available tasks:
		* grunt        : run jshint, uglify and sass:kickoff
		* grunt watch  : run sass:kickoff, uglify and livereload
		* grunt dev    : run jshint, uglify and sass:kickoff
		* grunt deploy : run jshint, uglify, sass:kickoff and csso
		* grunt serve  : watch js & scss and run a local server
		* grunt icons      : generate the icons. uses svgmin and grunticon
		* grunt check      : run jshint
		* grunt styleguide : watch js & scss, run a local server for editing the styleguide
		 ========================================================================== */

	/**
	 * GRUNT * Default task
	 * run jshint, uglify and sass:kickoff
	 */
	// Default task
	<% if (statix === true) {%>
	grunt.registerTask('default', [
		<% if (shims === true) {%>'shimly',<% } %>
		'dofilesexist:js',
		'uglify',
		'sass:kickoff',
		'autoprefixer:kickoff',
		'copy',
		'assemble'
	]);
	<% } else { %>
	grunt.registerTask('default', [
		<% if (shims === true) {%>'shimly',<% } %>
		'dofilesexist:js',
		'uglify',
		'sass:kickoff',
		'autoprefixer:kickoff'
	]);
	<% } %>


	/**
	 * GRUNT DEV * A task for development
	 * run jshint, uglify and sass:kickoff
	 */
	<% if (statix === true) {%>
	grunt.registerTask('dev', [
		<% if (shims === true) {%>'shimly',<% } %>
		'dofilesexist:js',
		'uglify',
		'sass:kickoff',
		'autoprefixer:kickoff',
		'copy',
		'assemble'
	]);
	<% } else { %>
	grunt.registerTask('dev', [
		<% if (shims === true) {%>'shimly',<% } %>
		'dofilesexist:js',
		'uglify',
		'sass:kickoff',
		'autoprefixer:kickoff'
	]);
	<% } %>


	/**
	 * GRUNT DEPLOY * A task for your production environment
	 * run jshint, uglify and sass:production
	 */
	<% if (statix === true) {%>
	grunt.registerTask('deploy', [
		<% if (shims === true) {%>'shimly',<% } %>
		'dofilesexist:js',
		'uglify',
		'sass:kickoff',
		'autoprefixer:kickoff',
		'csso',
		'copy',
		'assemble'
	]);
	<% } else { %>
	grunt.registerTask('deploy', [
		<% if (shims === true) {%>'shimly',<% } %>
		'dofilesexist:js',
		'uglify',
		'sass:kickoff',
		'autoprefixer:kickoff',
		'csso'
	]);
	<% } %>


	/**
	 * GRUNT SERVE * A task for for a static server with a watch
	 * run connect and watch
	 */
	<% if (statix === true) {%>
	grunt.registerTask("serve", [
		<% if (shims === true) {%>'shimly',<% } %>
		'dofilesexist:js',
		'uglify',
		'sass:kickoff',
		'sass:styleguide',
		'autoprefixer:kickoff',
		'copy',
		'assemble',
		'browserSync:serve',
		'watch'
	]);
	<% } else { %>
	grunt.registerTask("serve", [
		<% if (shims === true) {%>'shimly',<% } %>
		'dofilesexist:js',
		'uglify',
		'sass:kickoff',
		'sass:styleguide',
		'autoprefixer:kickoff',
		'browserSync:serve',
		'watch'
	]);
	<% } %>


	/**
	 * GRUNT STYLEGUIDE * A task for the styleguide
	 * run uglify, sass:kickoff, sass:styleguide, autoprefixer:kickoff, autoprefixer:styleguide, connect:styleguide & watch
	 */
	grunt.registerTask('styleguide', [
		<% if (shims === true) {%>'shimly',<% } %>
		'uglify',
		'sass:kickoff',
		'sass:styleguide',
		'autoprefixer:kickoff',
		'autoprefixer:styleguide',
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
		'jshint:project'
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
