/**
 * Global Grunt vars
 * Many of the Grunt tasks use these vars. Change as much as you like :)
 */

module.exports = {
	src : "./_grunt-configs/*.js", // This directory. Has all the Grunt tasks grouped into specific js files


	srcDir  : 'assets/src',  // <%%=config.srcDir%>
	distDir : 'assets/dist', // <%%=config.distDir%>
	tempDir : 'assets/temp', // <%%=config.tempDir%>


	// CSS-related Grunt vars
	css : {
		scssDir  : '<%%=config.srcDir%>/scss', // <%%=config.css.scssDir%>
		distDir  : '<%%=config.distDir%>/css', // <%%=config.css.distDir%>

		// Renaming this changes the name of the generated CSS file
		// Make sure you update your template file
		distFile : '<%= _.slugify(projectName) %>', // <%%=config.css.srcFile%>

		// We are supporting the last 2 browsers, any browsers with >5% market share,
		// and ensuring we support IE8+ with prefixes
		autoprefixer : ['> 5%', 'last 2 versions', 'ie > 7'] // <%%=config.css.autoprefixer%>
	},


	// Javascript-related Grunt vars
	js : {
		<% if (browserify === true) {%>srcFile : '<%%=config.srcDir%>/js/script.js',// <%%=config.js.srcFile%>
		<% } else { %>// The files in this array will be concatinated and minified by our build
		// Remove any files that you don't want, & add any that you need

		// <%%=config.js.fileList%>
		fileList : [
				<% if (jsLibs.indexOf('jquery1') != -1 || jsLibs.indexOf('jquery2') != -1) {
				%>'./node_modules/jquery/dist/jquery.js',<%
						if (jsLibs.indexOf('jquery1') != -1) {
					%> /* jQuery v1.x */<%
					} if (jsLibs.indexOf('jquery2') != -1) {
						%> /* jQuery v2.x */<%
					}
				}
				'<%%=config.srcDir%>/js/helpers/console.js',<%

				// if swiftclick is being used, add path to config
				if (jsLibs.indexOf('swiftclick') != -1) {
				%>
				'./node_modules/swiftclick/js/libs/swiftclick.js',<%
				}
				// if trak is being used, add path to config
				if (jsLibs.indexOf('trak') != -1) {
				%>
				'./node_modules/trak.js/dist/trak.js',<%
				}
				// if cookies is being used, add path to config
				if (jsLibs.indexOf('cookies') != -1) {
				%>
				'./node_modules/cookies-js/dist/cookies.js',<%
				}
				%>
				'<%%=config.srcDir%>/js/script.js'
		],<%
		} %>

		distDir  : '<%%=config.distDir%>/js/', // <%%=config.js.distDir%>

		// Renaming this changes the name of the generated JS file
		// Make sure you update your template file
		distFile : 'bundle.js', // <%%=config.js.distFile%>
	},


	// Image-related Grunt vars
	img : {
		srcDir       : '<%%=config.srcDir%>/img',      // <%%=config.img.srcDir%>
		distDir      : '<%%=config.distDir%>/img',     // <%%=config.img.distDir%>
		grunticonDir : '<%%=config.srcDir%>/grunticon' // <%%=config.img.grunticonDir%>
	}<%
	if (statix === true) {
	%>,


	statix : {
		dir : 'statix', // <%%= config.statix.dir%>
		distDir: './<%%= config.statix.dir%>/dist'
	}<% } %>
};
