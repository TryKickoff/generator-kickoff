module.exports.tasks = {

	/**
	* Watch
	* https://github.com/gruntjs/grunt-contrib-watch
	* Watches your scss, js etc for changes and compiles them
	*/
	watch: {
		scss: {
			files: ['<%%=config.css.scssDir%>/**/*.scss'],
			tasks: [
				'sass',
				'autoprefixer',
				'clean:tempCSS'<% if (statix == true) {%>,
				'copy:css'<% } %>
			],
			options: {
				interrupt: true,
				spawn: false
			}
		},

		js: {
			files: [
			<% if (browserify == true) {%>
				'js/**/*.js',
				'!js/dist/**/*.js'<% if (statix == true) {%>,
				'!<%%= config.statix.dir%>/assets/js/dist/**/*.js'<% } %>
			<% } else { %>'<%%=config.js.fileList%>'<% } %>
			],
			tasks: [
			<% if (browserify == true) {%>'browserify:dev'<% } else { %>
				'uglify',
				'newer:copy:modernizr'<% } %><% if (statix == true) {%>,
				'copy:js'<% } %>
			]
		},

		js: {
			<% if (browserify == true) {%>files: [
				'js/**/*.js',
				'!js/dist/**/*.js'<% if (statix == true) {%>,
				'!<%%= config.statix.dir%>/assets/js/dist/**/*.js'<% } %>
			],<% } else { %>
			files: [
				'<%%=config.js.fileList%>'<% if (statix == true) {%>,
				'!<%%= config.statix.dir%>/assets/js/dist/**/*.js'<% } %>
			],<% } %>
			tasks: [
				<% if (browserify == true) {%>'browserify:dev'<% } else { %>
				'uglify',
				'newer:copy:modernizr'<% } %><% if (statix == true) {%>,
				'copy:js'<% } %>
			]
			],
			options: {
				interrupt: true,
				spawn: false
			}
		},

		images : {
			files: ['<%%=config.img.srcDir%>/**/*.{svg,png,jpg,gif}'],
			tasks: ['imagemin:images'],
			options: {
				interrupt: true,
			}
		},

		<% if (grunticon == true) {%>grunticon : {
			files: ['<%%=config.img.grunticonDir%>/**/*.{svg,png,jpg,gif}'],
			tasks: [
				'clean:icons',
				'imagemin:grunticon',
				'grunticon'
			]
		},

		<% } %>grunt: {
			files: ['_grunt-configs/*.js', 'Gruntfile.js'],
			options: {
				reload: true
			}
		}<% if (statix === true) {%>,

		assemble : {
			files: ['<%%= config.statix.dir%>/src/templates/**/*.{hbs,md}'],
			tasks: [
				'assemble',
				'newer:copy:statix'
			],
			options: {
				livereload: true
			}
		},<% } %>
	}
};
