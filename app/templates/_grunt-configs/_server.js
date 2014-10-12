module.exports.tasks = {

	/**
	 * Connect
	 * https://github.com/gruntjs/grunt-contrib-connect
	 * Start a static web server
	 */
	connect: {
		site: {
			options: {
				open: true,
				livereload: true
				<% if (statix == true) {%>,
					base: '<%%= config.statix.dir%>/dist'
				<% } %>
			}
		},
		styleguide: {
			options: {
				open: {
					target: 'http://0.0.0.0:8000/_docs/styleguide.html'
				},
				livereload: true
			}
		},
		start: {
			options: {
				open: {
					target: 'http://0.0.0.0:8000/_docs/index.html'
				},
				livereload: true
			}
		}
	},


	/**
	 * browserSync
	 * http://www.browsersync.io/docs/options/
	 * http://www.browsersync.io/docs/grunt/
	 */
	browserSync: {
		serve: {
			bsFiles: {
				src: ['css/*.css', '<%%=config.js.distDir%>/*.js', '*.html']
			},
			options: {
				watchTask: true,
				server: {
					<% if (statix == true) {%>
						baseDir: './<%%= config.statix.dir%>/dist'
					<% } else { %>
						baseDir: './'
					<% } %>
				}
			}
		}
	}<% if (statix === true) {%>,


	/**
	 * Assemble
	 * http://assemble.io/
	 * Static site generator
	 */
	assemble: {
		options: {
			data: '<%%= config.statix.dir%>/src/**/*.{json,yml}',
			assets: '<%%= site.destination %>/assets',
			helpers: ['helper-moment', 'handlebars-helper-eachitems', '<%%= config.statix.dir%>/src/helpers/helper-*.js'],

			partials: ['<%%= config.statix.dir%>/src/templates/includes/**/*.hbs'],
			flatten: false,

			layout: 'default.hbs',
			layoutdir: '<%%= config.statix.dir%>/src/templates/layouts'
		},

		default: {
			files: [{
				cwd: './<%%= config.statix.dir%>/src/templates/pages/',
				dest: '<%%= site.destination %>',
				expand: true,
				src: ['**/*.hbs']
			}]
		}
	}<% } %>
};
