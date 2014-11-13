module.exports.tasks = {

	/**
	 * scss Lint
	 * https://github.com/ahmednuaman/grunt-scss-lint
	 */
	scsslint: {
		allFiles: [
			'<%%=config.css.scssDir%>/**/*.scss',
		],
		options: {
			config: '.scss-lint.yml',
			reporterOutput: null
		},
	},


	/**
	 * JSHint
	 * https://github.com/gruntjs/grunt-contrib-jshint
	 * Manage the options inside .jshintrc file
	 */
	jshint: {
		options: {
			jshintrc: '.jshintrc'
		},
		project: '<%%=config.js.fileList%>',
		all: ['js/**/*.js', '!js/dist/*.js', '!js/**/*.min.js']
	},



	/**
	 * Grunt Photobox
	 * https://github.com/stefanjudis/grunt-photoBox
	 * Visual regression testing tool
	 */
	photobox: {
		task: {
			options: {
			screenSizes : '<%%=config.testing.visual.sizes%>',
			urls        : '<%%=config.testing.visual.urls%>'
			}
		}
	},
};
