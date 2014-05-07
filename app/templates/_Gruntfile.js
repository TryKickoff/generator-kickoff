module.exports = function (grunt) {
	'use strict';

	/**
	 * Project configuration
	 */
	grunt.initConfig({
		pkg: require('./package'), // <%%= pkg.name %>
		<% if (statix == true) {%>site: grunt.file.readYAML('src/data/site.yml'),<% } %>
		/**
		 * Config - Edit this section
		 * ==========================
		 * Choose javascript dist filename
		 * Choose javascript dist location
		 * Choose javascript files to be uglified
		 */
		config : {
			js : {
				// <%%= config.js.distDir %>
				distDir  : 'js/dist/',

				// <%%= config.js.distFile %>
				distFile : 'app.min.js',

				// <%%= config.js.fileList %>
				fileList : [
					'js/helpers/helpers.js',
					'js/helpers/console.js',
					<% if (jsLibs == 'jquery') {%>'js/libs/jquery/jquery-1.10.2.js',<% } %>
					<% if (jsMobileDev == true) {%>'/bower_components/swiftclick/js/dist/swiftclick.min.js',<% } %>
					'js/script.js',
				]
			}
		},


		/**
		 * Watch
		 * https://github.com/gruntjs/grunt-contrib-watch
		 * Watches your scss, js etc for changes and compiles them
		 */
		watch: {
			scss: {
				files: ['scss/**/*.scss'],
				<% if (statix == true) {%>
				tasks: ['sass:kickoff', 'sass:styleguide', 'autoprefixer:dist', 'copy:css']
				<% } else { %>
				tasks: ['sass:kickoff', 'sass:styleguide', 'autoprefixer:dist']
				<% } %>
			},

			js: {
				files: ['<%%= config.js.fileList %>', 'Gruntfile.js'],
				<% if (statix == true) {%>
				tasks: ['uglify', 'copy:js']
				<% } else { %>
				tasks: ['uglify']
				<% } %>
			},

			livereload: {
				options: { livereload: true },
				<% if (statix == true) {%>
				files: ['dist/css/*.css']
				<% } else { %>
				files: ['css/*.css']
				<% } %>
			},

			grunticon : {
				files: ['img/src/*.svg', 'img/src/*.png'],
				tasks: ['svgmin', 'grunticon']
			}

			<% if (statix === true) {%>,
			assemble : {
				files: ['src/templates/**/*.hbs', 'src/templates/**/*.md'],
				tasks: ['clean', 'assemble', 'newer:copy'],
				options: {
					livereload: true
				}
			}<% } %>
		},


		/**
		 * Sass compilation
		 * https://github.com/gruntjs/grunt-contrib-sass
		 * Includes kickoff.scss and kickoff-old-ie.scss by default
		 * Also creates source maps
		 */
		sass: {
			kickoff: {
				options: {
					unixNewlines: true,
					style: 'expanded',
					lineNumbers: false,
					debugInfo : false,
					precision : 8,
					sourcemap: true
				},
				files: {
					'css/<%= _.slugify(projectName) %>.css'       : 'scss/kickoff.scss',
					'css/<%= _.slugify(projectName) %>-old-ie.css': 'scss/kickoff-old-ie.scss'
				}
			},
			styleguide: {
				options: {
					unixNewlines: true,
					style: 'expanded',
					precision : 8,
					sourcemap: true
				},
				files: {
					'css/styleguide.css': 'scss/styleguide.scss'
				}
			}
		},


		/**
		 * Autoprefixer
		 * https://github.com/nDmitry/grunt-autoprefixer
		 * https://github.com/ai/autoprefixer
		 * Auto prefixes your CSS using caniuse data
		 */
		autoprefixer: {
			dist : {
				options: {
					// Task-specific options go here - we are supporting
					// the last 2 browsers, any browsers with >1% market share,
					// and ensuring we support IE7 + 8 with prefixes
					browsers: ['> 5%', 'last 4 versions', 'firefox > 3.6', 'ie > 6'],
					map: true
				},
				files: {
					'css/<%= _.slugify(projectName) %>.css'       : 'css/kickoff.css',
					'css/<%= _.slugify(projectName) %>-old-ie.css': 'css/kickoff-old-ie.css',
					'css/styleguide.css'                          : 'css/styleguide.css'
				}
			}
		},


		/**
		 * Uglify
		 * https://github.com/gruntjs/grunt-contrib-uglify
		 * Minifies and concatinates your JS
		 * Also creates source maps
		 */
		uglify: {
			options: {

				mangle: true, // mangle: Turn on or off mangling
				beautify: false, // beautify: beautify your code for debugging/troubleshooting purposes
				compress: false,
				// report: 'gzip', // report: Show file size report
				sourceMap: '<%%= config.js.distDir %><%%= config.js.distFile %>.map',
				sourceMappingURL: '/<%%= config.js.distFile %>.map',
			},
			js: {
				src: '<%%= config.js.fileList %>',
				dest: '<%%= config.js.distDir %><%%= config.js.distFile %>'
			}
		},


		/**
		 * Grunticon
		 * https://github.com/filamentgroup/grunticon
		 */
		grunticon: {
			myIcons: {
				files: [{
					expand: true,
					cwd   : 'img/src-min',
					src   : ['*.svg', '*.png'],
					dest  : 'img/icons'
				}],
				options: {
					// customselectors: {
					// 	"*": [".icon-$1:before"]
					// }
				}
			}
		},


		/**
		 * SVGmin
		 * https://github.com/sindresorhus/grunt-svgmin
		 */
		svgmin: {
			options: {
				plugins: [
					{ removeViewBox: false },
					{ removeUselessStrokeAndFill: false }
				]
			},
			dist: {                     // Target
				files: [{               // Dictionary of files
					expand: true,       // Enable dynamic expansion.
					cwd: 'img/src',     // Src matches are relative to this path.
					src: ['**/*.svg'],  // Actual pattern(s) to match.
					dest: 'img/src-min',       // Destination path prefix.
					ext: '.svg'     // Dest filepaths will have this extension.
					// ie: optimise img/src/branding/logo.svg and store it in img/branding/logo.min.svg
				}]
			}
		},


		/**
		 * CSSO
		 * https://github.com/t32k/grunt-csso
		 * Minify CSS files with CSSO
		 */
		csso: {
			dist: {
				files: {
					'css/<%= _.slugify(projectName) %>.css'       : 'css/kickoff.css',
					'css/<%= _.slugify(projectName) %>-old-ie.css': 'css/kickoff-old-ie.css'
				},

			}
		},


		/**
		 * Connect
		 * https://github.com/gruntjs/grunt-contrib-connect
		 * Start a static web server
		 */
		connect: {
			server: {
				options: {
					// port: 9001,
					// hostname: 'mysite.local',
					open: true,
					livereload: true
					<% if (statix == true) {%>
					,base: 'dist'
					<% } %>
				}
			}
		},


		/**
		 * JSHint
		 * https://github.com/gruntjs/grunt-contrib-jshint
		 * Manage the options inside .jshintrc file
		 */
		jshint: {
			all: '<%%= config.js.fileList %>',
			options: {
				jshintrc: '.jshintrc'
			}
		},


		/**
		 * JSCS
		 * https://github.com/dsheiko/grunt-jscs
		 * Manage the options inside .jscs.json file
		 */
		jscs: {
			src: '<%%= config.js.fileList %>',
			options: {
				config: ".jscs.json"
			}
		}

		<% if (jsLibs === 'jquery') {%>,
		/**
		 * Custom jQuery builder
		 * Check build numbers at jquery.com
		 */
		jquery: {
			build: {
				options: {
					prefix: "jquery-",
					minify: true
				},
				output: "js/libs/jquery",
				versions: {
					// Add items to the below arrays to remove them from the build
					// Remove everything we don't need from 2.x versions
					//"2.0.3": [ "deprecated", "dimensions", "offset", "wrap"],

					// We can't remove sizzle from 1.x versions, so let's not specify it
					"1.10.2": [ "deprecated"]
				}
			}
		}
		<% } %>


		<% if (statix === true) {%>,
		/**
		 * Assemble
		 * http://assemble.io/
		 * Static site generator
		 */
		assemble: {
			options: {
				data: 'src/**/*.{json,yml}',
				assets: '<%%= site.destination %>/assets',
				helpers: ['helper-moment', 'handlebars-helper-eachitems', 'src/helpers/helper-*.js'],

				partials: ['src/templates/includes/**/*.hbs'],
				flatten: false,

				layout: 'default.hbs',
				layoutdir: 'src/templates/layouts'
			},

			default: {
				files: [{
					cwd: './src/templates/pages/',
					dest: '<%%= site.destination %>',
					expand: true,
					src: ['**/*.hbs']
				}]
			}
		},


		/**
		 * Copy
		 * https://github.com/gruntjs/grunt-contrib-copy
		 * Copy files and folders.
		 */
		copy: {
			dist: {
				files: [
					{ expand: true, cwd: './css', src: ['./**/*.*'], dest: '<%%= site.destination %>/assets/css' },
					{ expand: true, cwd: './js', src: ['./**/*.*'], dest: '<%%= site.destination %>/assets/js' },
					{ expand: true, cwd: './img', src: ['./**/*.*'], dest: '<%%= site.destination %>/assets/img' },
					{ expand: true, cwd: './fonts', src: ['./**/*.*'], dest: '<%%= site.destination %>/assets/fonts' }
				]
			},
			css: {
				files: [
					{ expand: true, cwd: './css', src: ['./**/*.*'], dest: '<%%= site.destination %>/assets/css' }
				]
			},
			img: {
				files: [
					{ expand: true, cwd: './img', src: ['./**/*.*'], dest: '<%%= site.destination %>/assets/img' }
				]
			},
			fonts: {
				files: [
					{ expand: true, cwd: './fonts', src: ['./**/*.*'], dest: '<%%= site.destination %>/assets/fonts' }
				]
			},
			js: {
				files: [
					{ expand: true, cwd: './js', src: ['./**/*.*'], dest: '<%%= site.destination %>/assets/js' }
				]
			}
		},


		/**
		 * Clean
		 * https://github.com/gruntjs/grunt-contrib-clean
		 * Clear files and folders.
		 */
		clean: {
			all: ['<%%= site.destination %>/**/*.html']
		}
		<% } %>
	});

	// Load all the grunt tasks
	require('load-grunt-tasks')(grunt);
	<% if (statix === true) {%>grunt.loadNpmTasks('assemble');<% } %>


	/* ==========================================================================
		Available tasks:
		* grunt        : run jshint, uglify and sass:kickoff
		* grunt watch  : run sass:kickoff, uglify and livereload
		* grunt dev    : run jshint, uglify and sass:kickoff
		* grunt deploy : run jshint, uglify, sass:kickoff and csso
		* grunt jquery : build custom version of jquery
		* grunt serve  : watch js & scss and run a local server
		* grunt availabletasks : view all available tasks
		 ========================================================================== */

	/**
	 * GRUNT * Default task
	 * run jshint, uglify and sass:kickoff
	 */
	// Default task
	<% if (statix === true) {%>
	grunt.registerTask('default', [
		'uglify',
		'sass:kickoff',
		'autoprefixer:dist',
		'copy',
		'assemble'
	]);
	<% } else { %>
	grunt.registerTask('default', [
		'uglify',
		'sass:kickoff',
		'autoprefixer:dist'
	]);
	<% } %>


	/**
	 * GRUNT DEV * A task for development
	 * run jshint, uglify and sass:kickoff
	 */
	<% if (statix === true) {%>
	grunt.registerTask('dev', [
		'uglify',
		'sass:kickoff',
		'autoprefixer:dist',
		'copy',
		'assemble'
	]);
	<% } else { %>
	grunt.registerTask('dev', [
		'uglify',
		'sass:kickoff',
		'autoprefixer:dist'
	]);
	<% } %>


	/**
	 * GRUNT DEPLOY * A task for your production environment
	 * run jshint, uglify and sass:production
	 */
	<% if (statix === true) {%>
	grunt.registerTask('deploy', [
		'uglify',
		'sass:kickoff',
		'autoprefixer:dist',
		'csso',
		'copy',
		'assemble'
	]);
	<% } else { %>
	grunt.registerTask('deploy', [
		'uglify',
		'sass:kickoff',
		'autoprefixer:dist',
		'csso'
	]);
	<% } %>


	/**
	 * GRUNT SERVE * A task for for a static server with a watch
	 * run connect and watch
	 */
	<% if (statix === true) {%>
	grunt.registerTask("serve", [
		'uglify',
		'sass:kickoff',
		'sass:styleguide',
		'autoprefixer:dist',
		'copy',
		'assemble',
		'connect',
		'watch'
	]);
	<% } else { %>
	grunt.registerTask("serve", [
		'uglify',
		'sass:kickoff',
		'sass:styleguide',
		'autoprefixer:dist',
		'connect',
		'watch'
	]);
	<% } %>

	/**
	 * TODO:
	 * Need task to update all grunt dependencies
	 * Need task to download all bower dependencies
	 */

};
