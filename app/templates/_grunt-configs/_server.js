module.exports.tasks = {

	/**
	 * browserSync
	 * http://www.browsersync.io/docs/options/
	 * http://www.browsersync.io/docs/grunt/
	 */
	browserSync: {
		serve: {
			bsFiles: {
				src: [<%
				if (statix) { %>
					'<%%= config.statix.dir%>/dist/assets/**/*.*',
					'<%%= config.statix.dir%>/dist/**/*.html'<%
				} else { %>
					'<%%=config.css.distDir%>/*.css',
					'<%%=config.js.distDir%>/*.js',
					'**/*.html'<%
				} %>
				]
			},
			options: {
				watchTask: true,
				server: {<%
				if (statix) { %>
					baseDir: './<%%= config.statix.dir%>/dist'<%
				} else { %>
					baseDir: './'<%
				} %>
				}
			}
		}<% if (styleguide) { %>,


		styleguide: {
			bsFiles: {
				src: [<%
				if (statix) { %>
					'<%%= config.statix.dir%>/dist/assets/**/*.*',
					'<%%= config.statix.dir%>/dist/**/*.html'<%
				} else { %>
					'<%%= config.distDir%>/**/*.*',
					'*.html'<%
				} %>
				]
			},
			options: {
				watchTask: true,
				server: {<%
					if (statix) { %>
					baseDir: './<%%= config.statix.dir%>/dist',<%
				} else { %>
					baseDir: './',<%
				} %>
					index: 'styleguide/index.html'
				}
			}
		}<% } %>
	}<%
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
				'handlebars-helper-aggregate'
			],

			partials: ['<%%= config.statix.dir%>/src/templates/includes/**/*.hbs'],
			flatten: false,

			layout: 'default.hbs',
			layoutdir: '<%%= config.statix.dir%>/src/templates/layouts'
		},

		default: {
			files: [{
				cwd: './<%%= config.statix.dir%>/src/templates/pages/',
				dest: '<%%= config.statix.distDir %>',
				expand: true,
				src: ['**/*.{hbs,md}']
			}]
		}
	}<%
} //end of statix conditional
%>
};
