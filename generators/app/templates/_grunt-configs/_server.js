module.exports.tasks = {

	/**
	 * browserSync
	 * http://www.browsersync.io/docs/options/
	 * http://www.browsersync.io/docs/grunt/
	 */
	browserSync: {
		options: {
			watchTask: true,
			notify: {
				styles: [
					'pointer-events: none',
					'position: fixed',
					'bottom: 0',
					'left: 0',
					'right: 0',
					'text-align: center',
					'background-color: #181830',
					'color: #fff',
					'padding: 15px',
				],
			},
		},

		serve: {
			bsFiles: {
				src: [<%
					if (statix) { %>
					'<%%= config.statix.dir%>/dist/assets/{js,img}/**/*.*',
					'<%%= config.statix.dir%>/dist/**/*.html',<%
					} else { %>
					'<%%=config.distDir%>/{js,img}/**/*.*',
					'**/*.html',<%
					} %>
				]
			},
			options: {
				server: {<%
					if (statix) { %>
					baseDir: './<%%= config.statix.dir%>/dist',
					background: true,<%
					} else { %>
					baseDir: './',<%
					} %>
				},
			},
		},<% if (styleguide) { %>


		styleguide: {
			options: {
				server: {<%
					if (statix) { %>
					baseDir: './<%%= config.statix.dir%>/dist',
					background: true,<%
					} else { %>
					baseDir: './',<%
					} %>
					index: 'styleguide/index.html',
				},
			},
		}<% } %>
	},<%
	if (statix) { %>,


	/**
	 * Assemble
	 * http://assemble.io/
	 * Static site generator used by Statix
	 * Find out more at https://github.com/TryKickoff/statix
	 */
	assemble: {
		options: {
			data: '<%%= config.statix.dir%>/src/**/*.{json,yml}',
			assets: '<%%= config.statix.distDir%>/assets',
			helpers: [
				'helper-moment',
				'handlebars-helper-eachitems',
				'<%%= config.statix.dir%>/src/helpers/helper-*.js',
				'handlebars-helper-aggregate',
			],

			partials: ['<%%= config.statix.dir%>/src/templates/partials/**/*.hbs'],
			flatten: false,

			layout: 'default.hbs',
			layoutdir: '<%%= config.statix.dir%>/src/templates/layouts',

			aggregate: {
				cwd: '<%%= config.statix.dir%>/src/templates/'
			},
		},

		default: {
			files: [{
				cwd: './<%%= config.statix.dir%>/src/templates/views/',
				dest: '<%%= config.statix.distDir %>',
				expand: true,
				src: ['**/*.hbs'],
			}],
		},
	},<% } %> //end of statix conditional
};
