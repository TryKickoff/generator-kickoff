module.exports.tasks = {

	/**
	* Watch
	* https://github.com/gruntjs/grunt-contrib-watch
	* Watches your scss, js etc for changes and compiles them
	*/
	watch: {
		scss: {
			files: ['<%%=config.css.scssDir%>/**/*.scss', '!<%%=config.css.scssDir%>/styleguide.scss'],
			<% if (statix == true) {%>
			tasks: ['sass:kickoff', 'autoprefixer:kickoff', 'copy:css']
			<% } else { %>
			tasks: ['sass:kickoff', 'autoprefixer:kickoff']
			<% } %>
		},

		"styleguide_scss": {
			files: ['<%%=config.css.scssDir%>/styleguide.scss'],
			tasks: [
				'sass:styleguide',
				'autoprefixer:styleguide'
			]
		},

		js: {
			<% if (browserify == true) {%>
			files: [
				'js/**/*.js',
				'!js/dist/**/*.js'
				<% if (statix == true) {%>,'!statix/assets/js/dist/**/*.js'<% } %>
			],
			tasks: [
				'browserify:dev',
				<% if (statix == true) {%>,'copy:js'<% } %>
			]
			<% } else { %>
			files: [
				'<%%=config.js.fileList%>'
				<% if (statix == true) {%>,'!statix/assets/js/dist/**/*.js'<% } %>
			],
			tasks: [
				'uglify',
				<% if (statix == true) {%>,'copy:js'<% } %>
			]
			<% } %>
		},

		livereload: {
			options: { livereload: true },
			<% if (statix == true) {%>
			files: ['<%%= config.statix.dir%>/dist/css/*.css']
			<% } else { %>
			files: ['<%%=config.css.distDir%>/*.css']
			<% } %>
		},

		grunticon : {
			files: ['img/src/*.svg', 'img/src/*.png'],
			tasks: [
				'clean:icons',
				'svgmin',
				'grunticon'
			]
		},

		grunt: {
			files: ['_grunt-configs/*.js', 'Gruntfile.js']
		}<% if (statix === true) {%>,

		assemble : {
			files: ['<%%= config.statix.dir%>/src/templates/**/*.hbs', '<%%= config.statix.dir%>/src/templates/**/*.md'],
			tasks: ['clean', 'assemble', 'newer:copy'],
			options: {
				livereload: true
			}
		},<% } %>
	}
};
