module.exports.tasks = {

	/**
	 * grunt-contrib-imagemin
	 * https://github.com/gruntjs/grunt-contrib-imagemin
	 * Minify PNG, SVG, gif & JPEG images
	 */
	imagemin: {
		<% if (grunticon) {%>grunticon: {
			options: {
				optimizationLevel: 3,
				progressive : true,
				svgoPlugins: [
					{ removeViewBox: false },
					{ removeUselessStrokeAndFill: false }
				]
			},
			files: [{
				expand: true,
				cwd: '<%%=config.img.grunticonDir%>',
				src: ['**/*.{svg,png,jpg,gif}'],
				dest: '<%%=config.tempDir%>/icons'
			}]
		},

		<% } %>images: {
			files: [{
				expand: true,
				cwd: '<%%=config.img.srcDir%>/',
				src: ['**/*.{svg,png,jpg,gif}'],
				dest: '<%%=config.img.distDir%>'
			}]
		}
	}<%

	if (grunticon) {%>,


	/**
	 * Grunticon
	 * https://github.com/filamentgroup/grunticon
	 */
	grunticon: {
		myIcons: {
			files: [{
				expand: true,
				cwd   : '<%%=config.tempDir%>/icons',
				src   : ['*.{svg,png,jpg,gif}'],
				dest  : '<%%=config.img.distDir%>/icons'
			}],
			options: {
				enhanceSVG: true,
				template: "./_grunt-configs/grunticon-tpl.hbs"
				// https://github.com/filamentgroup/grunticon#optionscustomselectors
				// customselectors: {
				// 	"arrow": [".icon-arrow:before"]
				// }
			}
		}
	}<% } %>
};
