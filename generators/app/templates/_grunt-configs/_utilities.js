module.exports.tasks = {

	/**
	 * Clean
	 * https://github.com/gruntjs/grunt-contrib-clean
	 * Clean some files
	 */
	clean: {
		icons   : ['<%%=config.distDir%>/img/icons', '<%%=config.tempDir%>/icons'],
		tempCSS : ['<%%=config.tempDir%>/css']<%
			if (statix) {
		%>,
		all: ['<%%= config.statix.dir%>/dist/**/*.html']<%
			} %>
	},<%
	if (!browserify) {%>


	/**
	 * Chotto
	 * Checks for the existence of files and halts the Grunt build if they don't exist
	 * https://www.npmjs.com/package/chotto
	 */
	chotto : {
		js : {
			filePaths: '<%%=config.js.fileList%>'
		}
	},<% } %>


	/**
	 * Copy files
	 * https://github.com/gruntjs/grunt-contrib-copy
	 */
	copy: {<%
		if (modernizr || shims) {%>
		jsStandalone: {
			files: [{
				expand: true,
				cwd: '<%%=config.srcDir%>/js/standalone',
				src: ['./**/*.*'],
				dest: '<%%=config.js.distDir%>/standalone'
			}]
		}<%
		}

		if (statix) {%>,
		statix: {
			files: [
				{
					expand: true,
					cwd: '<%%=config.img.distDir%>',
					src: ['./**/*.*'],
					dest: '<%%=config.statix.dir%>/dist/assets/img'
				},
				{
					expand: true,
					cwd: '<%%=config.js.distDir%>',
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
				cwd: '<%%=config.img.distDir%>',
				src: ['./**/*.*'],
				dest: '<%%= config.statix.dir%>/dist/assets/img'
			}]
		},
		js: {
			files: [{
				expand: true,
				cwd: '<%%=config.js.distDir%>',
				src: ['./**/*.*'],
				dest: '<%%= config.statix.dir%>/dist/assets/js'
			}]
		}<% } %>
	},


	/**
	 * grunt-filesizegzip
	 * https://github.com/mrmartineau/grunt-filesizegzip
	 * Output the normal & gzipped file size of a given file
	 */
	filesizegzip: {
		js: {
			src: '<%%=config.js.distDir%><%%=config.js.distFile%>'
		},

		css: {
			src: '<%%=config.css.distDir%>/<%%=config.css.distFile%>.css'
		},

		grunticon: {
			src: '<%%=config.img.distDir%>/icons/icons.data.svg.css'
		}
	},
};
