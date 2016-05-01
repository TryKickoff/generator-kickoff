module.exports.tasks = {

	/**
	 * Clean
	 * https://github.com/gruntjs/grunt-contrib-clean
	 * Clean some files
	 */
	clean: {<%
		if (statix) { %>
		all: ['<%%= config.statix.dir%>/dist/**/*.html']<% } %>
	},


	/**
	 * Copy files
	 * https://github.com/gruntjs/grunt-contrib-copy
	 */
	copy: {<%
		if (modernizr || shims || flexboxFallback) {%>
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
					dest: '<%%=config.statix.dir%>/dist/assets/dist/img'
				},
				{
					expand: true,
					cwd: '<%%=config.js.distDir%>',
					src: ['./**/*.*'],
					dest: '<%%=config.statix.dir%>/dist/assets/dist/js'
				},
				{
					expand: true,
					cwd: './<%%=config.css.distDir%>',
					src: ['./*.{css,map}'],
					dest: '<%%= config.statix.dir%>/dist/assets/dist/css'
				}
			]
		},
		css: {
			files: [{
				expand: true,
				cwd: './<%%=config.css.distDir%>',
				src: ['./*.{css,map}'],
				dest: '<%%= config.statix.dir%>/dist/assets/dist/css'
			}]
		},
		img: {
			files: [{
				expand: true,
				cwd: '<%%=config.img.distDir%>',
				src: ['./**/*.*'],
				dest: '<%%= config.statix.dir%>/dist/assets/dist/img'
			}]
		},
		js: {
			files: [{
				expand: true,
				cwd: '<%%=config.js.distDir%>',
				src: ['./**/*.*'],
				dest: '<%%= config.statix.dir%>/dist/assets/dist/js'
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
