module.exports.tasks = {

	/**
	* Watch
	* https://github.com/gruntjs/grunt-contrib-watch
	* Watches your scss, js etc for changes and compiles them
	*/
	watch: {
		options: {
			interrupt: true,
			spawn: false
		},

		scss: {
			files: ['<%%=config.css.scssDir%>/**/*.scss'],
			tasks: [
				'bsNotify:sassStart',
				// 'scsslint', // uncomment this line if you want to run linting checks on your SCSS as part of your watch build
				'postscss'<%
				if (statix) {%>,
				'copy:css'<%
				} %>,
				'bsReload:css',
				'filesizegzip:css'
			]
		},

		js: {
			files: [<%
				if (browserify) { %>
				'<%%=config.js.distDir%>/**/*.js'<%
				} else { %>
				'<%%=config.js.fileList%>'<% } %>
			],
			tasks: [
				/* 'jshint:project', / uncomment this line if you want to run linting checks on your JS as part of your watch build*/<%
				if (!browserify) { %>
				'uglify',
				'newer:copy:modernizr'<%
				} %><%
				if (statix) {%>,
				'copy:js'<%
				} %>,
				'filesizegzip:js'
			]
		},

		images : {
			files: ['<%%=config.img.srcDir%>/**/*.{svg,png,jpg,gif}'],
			tasks: ['imagemin:images'],
			options: {
				interrupt: true
			}
		},<% if (grunticon) {%>

		grunticon : {
			files: ['<%%=config.img.grunticonDir%>/**/*.{svg,png,jpg,gif}'],
			tasks: [
				'icons',
				'filesizegzip:grunticon'
			]
		},<% } %>

		grunt: {
			files: ['_grunt-configs/*.js', 'Gruntfile.js'],
			options: {
				reload: true
			}
		}<% if (statix) {%>,

		assemble : {
			files: ['<%%=config.statix.dir%>/src/templates/**/*.{hbs,md}'],
			tasks: [
				'assemble',
				'newer:copy:statix'
			],
			options: {
				livereload: true
			}
		},<% } %>
	},

	// Browsersync reload
	bsReload: {
		css: {
			reload: '<%%=config.distDir%>/css/*.css'
		},
		all: {
			reload: true
		}
	},

	// Browsersync notify
	bsNotify: {
		sassStart: {
			notify: 'Please wait, compiling Sass!'
		}
	}
};
