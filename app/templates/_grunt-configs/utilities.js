module.exports.tasks = {

	/**
	 * Clean
	 * https://github.com/gruntjs/grunt-contrib-clean
	 * Clean some files
	 */
	clean: {
		icons: ['img/icons']
	},


	/**
	 * Shell
	 * https://github.com/sindresorhus/grunt-shell
	 * Run shell commands
	 */
	shell: {
		bowerinstall: {
			command: 'bower install'
		}
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

	dofilesexist : {
		js : "<%%=config.js.fileList%>"
	}<% if (statix === true) {%>,


	/**
	 * Copy
	 * https://github.com/gruntjs/grunt-contrib-copy
	 * Copy files and folders.
	 */
	copy: {
		dist: {
			files: [
				{ expand: true, cwd: './img', src: ['./**/*.*'], dest: '<%%= config.statix.dir%>/dist/assets/img' },
				{ expand: true, cwd: './fonts', src: ['./**/*.*'], dest: '<%%= config.statix.dir%>/dist/assets/fonts' }
			]
		},
		img: {
			files: [
				{ expand: true, cwd: './img', src: ['./**/*.*'], dest: '<%%= config.statix.dir%>/dist/assets/img' }
			]
		},
		fonts: {
			files: [
				{ expand: true, cwd: './fonts', src: ['./**/*.*'], dest: '<%%= config.statix.dir%>/dist/assets/fonts' }
			]
		}
	}


	/**
	 * Clean
	 * https://github.com/gruntjs/grunt-contrib-clean
	 * Clear files and folders.
	 */
	clean: {
		all: ['<%%= config.statix.dir%>/dist/**/*.html']
	}<% } %>
};
