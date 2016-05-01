module.exports.tasks = {

	/**
	* Watch
	* https://github.com/gruntjs/grunt-contrib-watch
	* Watches your scss, js etc for changes and compiles them
	*/
	watch: {
		options: {
			interrupt: true,
			spawn: false,
		},

		scss: {
			files: ['<%%=config.css.scssDir%>/**/*.scss'],
			tasks: [
				'bsNotify:sassStart',
				'postscss',<%
				if (statix) {%>
				'copy:css',<%
				} %>
				'bsReload:css',
				'filesizegzip:css',
			]
		},

		js: {
			files: [
				'<%%=config.js.distDir%>/**/*.js',
			],
			tasks: [<%
				if (statix) {%>
				'copy:js',<%
				} %>
				'bsReload:all',
				'filesizegzip:js',
			]
		},

		images : {
			files: ['<%%=config.img.srcDir%>/**/*.{svg,png,jpg,gif}'],
			tasks: [
				'imagemin:images',
				'bsReload:all',
			],
		},

		grunt: {
			files: ['_grunt-configs/*.js', 'Gruntfile.js'],
			options: {
				reload: true,
			},
		},<%

		if (statix) {%>

		assemble : {
			files: ['<%%=config.statix.dir%>/src/templates/**/*.{hbs,md}'],
			tasks: [
				'assemble',
				'newer:copy:statix',
				'bsReload:all',
			]
		},<% } %>
	},

	// Browsersync reload
	bsReload: {
		css: {
			reload: '<%%=config.distDir%>/css/*.css',
		},
		all: {
			reload: true,
		},
	},

	// Browsersync notify
	bsNotify: {
		sassStart: {
			notify: 'Please wait, compiling Sass!',
		},
	},
};
