module.exports.tasks = {

	/**
	 * Clean
	 * https://github.com/gruntjs/grunt-contrib-clean
	 * Clean some files
	 */
	clean: {
		icons: ['img/icons']
		<% if (statix === true) {%>,all: ['<%%= config.statix.dir%>/dist/**/*.html']<% } %>
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
				{
					expand: true,
					cwd: './img',
					src: ['./**/*.*'],
					dest: '<%%=config.statix.dir%>/dist/assets/img'
				},
				{
					expand: true,
					cwd: './js',
					src: ['./**/*.*'],
					dest: '<%%=config.statix.dir%>/dist/assets/js'
				},
				{
					expand: true,
					cwd: './<%%=config.css.distDir%>',
					src: ['./*.{css,map}'],
					dest: '<%%= config.statix.dir%>/dist/assets/css'
				}
			]
		},
		css: {
			files: [{
				expand: true,
				cwd: './<%%=config.css.distDir%>',
				src: ['./*.{css,map}'],
				dest: '<%%= config.statix.dir%>/dist/assets/css'
			}]
		},
		img: {
			files: [{
				expand: true,
				cwd: './img',
				src: ['./**/*.*'],
				dest: '<%%= config.statix.dir%>/dist/assets/img'
			}]
		},
		js: {
			files: [{
				expand: true,
				cwd: './js',
				src: ['./**/*.*'],
				dest: '<%%= config.statix.dir%>/dist/assets/js'
			}]
		}
	}<% } %>
};
