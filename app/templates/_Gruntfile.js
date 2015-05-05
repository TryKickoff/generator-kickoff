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


	/**
	 * Available tasks:
	 * grunt            : Alias for 'serve' task, below
	 * grunt serve      : watch js, images & scss and run a local server
	 * grunt watch      : run sass:kickoff, uglify and livereload
	 * grunt dev        : run uglify, sass:kickoff & autoprefixer:kickoff
	 * grunt deploy     : run jshint, uglify, sass:kickoff and csso
	 * grunt styleguide : watch js & scss, run a local server for editing the styleguide
	 * grunt icons      : generate the icons. uses svgmin and grunticon
	 * grunt checks     : run jshint & scsslint
	 */

	/**
	 * GRUNT * Alias for 'serve' task, below
	 */
	grunt.registerTask('default', ['serve']);


	/**
	 * GRUNT SERVE * A task for a static server with a watch
	 * run browserSync and watch
	 */
	grunt.registerTask('serve', [
		<% if (statix === true) {%>'clean:all',<% } %>
		<% if (shims === true) {%>'shimly',<% } %>
		<% if (browserify === true) {%>'newer:browserify:prod',
		<% } else { %>'chotto:js',
		'uglify',<% } %>
		'sass',
		'autoprefixer',
		'clean:tempCSS',
		'copy:modernizr',
		<% if (statix === true) {%>'copy',
		'assemble',<% } %>
		'browserSync:serve',
		'watch'
	]);


	/**
	 * GRUNT DEV * A task for development
	 * run uglify, sass:kickoff & autoprefixer:kickoff
	 */
	grunt.registerTask('dev', [
		<% if (statix === true) {%>'clean:all',<% } %>
		<% if (shims === true) {%>'shimly',<% } %>
		<% if (browserify === true) {%>
		'newer:browserify:prod',
		<% } else { %>
		'chotto:js',
		'uglify',
		<% } %>
		'sass',
		'autoprefixer',
		'clean:tempCSS',
		'copy:modernizr'<% if (statix === true) {%>,
		'copy',
		'assemble'<% } %>
	]);


	/**
	 * GRUNT DEPLOY * A task for your production environment
	 * run jshint, uglify and sass:production
	 */
	grunt.registerTask('deploy', [
		<% if (statix === true) {%>'clean:all',<% } %>
		<% if (shims === true) {%>'shimly',<% } %>
		<% if (browserify === true) {%>'newer:browserify:prod',
		<% } else { %>'chotto:js',
		'uglify',<% } %>
		'sass',
		'autoprefixer',
		'csso',
		'clean:tempCSS',
		'copy:modernizr'<% if (statix === true) {%>,
		'copy',
		'assemble'<% } %>
	]);


	/**
	 * GRUNT STYLEGUIDE * A task for the styleguide
	 * run uglify, sass:kickoff, sass:styleguide, autoprefixer:kickoff, autoprefixer:styleguide, connect:styleguide & watch
	 */
	grunt.registerTask('styleguide', [
		<% if (statix === true) {%>'clean:all',<% } %>
		<% if (shims === true) {%>'shimly',<% } %>
		<% if (browserify === true) {%>'newer:browserify:prod',
		<% } else { %>'chotto:js',
		'uglify',<% } %>
		'sass',
		'autoprefixer',
		'clean:tempCSS',
		'copy:modernizr',
		<% if (statix === true) {%>'copy',
		'assemble',<% } %>
		'browserSync:styleguide'
	]);


	/**
	 * GRUNT ICONS * A task to create all icons using grunticon
	 * run clean, svgmin and grunticon
	 */
	grunt.registerTask('icons', [
		'clean:icons',
		'imagemin:grunticon',
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

};
