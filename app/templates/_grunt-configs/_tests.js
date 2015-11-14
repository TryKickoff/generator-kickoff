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
		project: [
			'<%%=config.srcDir%>/js/**/*.js',
			'!<%%=config.srcDir%>/js/{libs,helpers}/**/*.js',
			'!<%%=config.srcDir%>/js/**/*.min.js'
		]
	}
};
