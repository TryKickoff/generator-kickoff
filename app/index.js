'use strict';
var util            = require('util');
var yeoman          = require('yeoman-generator');
var chalk           = require('chalk');
var updateNotifier  = require('update-notifier');
var pkg             = require('../package.json');
var opn             = require('opn');
var _s              = require('underscore.string');

var KickoffGenerator = module.exports = function KickoffGenerator(args, options) {
	yeoman.generators.Base.apply(this, arguments);
};


util.inherits(KickoffGenerator, yeoman.generators.Base);


KickoffGenerator.prototype.askFor = function () {
	var done = this.async();

	// Checks for available update and returns an instance
	var notifier = updateNotifier({
		packageName: pkg.name,
		packageVersion: pkg.version,
		updateCheckInterval: 1000 * 60 // Every hour
	});

	var kickoffWelcome = chalk.white.bold('\n ◍  ◍ ◍◍◍  ◍◍  ◍  ◍') + chalk.yellow.bold('  ◍◍  ◍◍◍ ◍◍◍') + chalk.white.bold('\n ◍ ◍   ◍  ◍  ◍ ◍ ◍  ') + chalk.yellow.bold('◍  ◍ ◍   ◍') + chalk.white.bold('\n ◍◍    ◍  ◍    ◍◍   ') + chalk.yellow.bold('◍  ◍ ◍◍  ◍◍') + chalk.white.bold('\n ◍ ◍   ◍  ◍  ◍ ◍ ◍  ') + chalk.yellow.bold('◍  ◍ ◍   ◍') + chalk.white.bold('\n ◍  ◍ ◍◍◍  ◍◍  ◍  ◍  ') + chalk.yellow.bold('◍◍  ◍   ◍') + '\n\n ' + chalk.white.bold('A Yeoman generator for the Kickoff front-end framework') + '\n\n Find out more at ' + chalk.cyan('trykickoff.com') + '\n Yeoman Generator version:  ' + pkg.version + '\n\n Kickoff is free and open-source and maintained by ' + chalk.yellow('@MrMartineau') + ',\n ' + chalk.green('@AshNolan_') + ', the ' + chalk.blue('@tmwTechTeam') + ' and a few other kind souls. \n';

	// Have Yeoman greet the user.
	this.log(kickoffWelcome);

	if (notifier.update) {
		// Check for npm package update and print message if needed
		var updateMessage = chalk.yellow('   ┌────────────────────────────────────────────────┐\n   │') + ' Update available: '  + chalk.green(notifier.update.latest) + chalk.gray(' (current: ' + pkg.version + ')') + '       '+ chalk.yellow('│\n   │') + ' Run ' + chalk.cyan('npm update -g ' + pkg.name) + ' to update. ' + chalk.yellow('│\n   └────────────────────────────────────────────────┘\n');

		this.log(updateMessage);
	}


	var prompts = [
		{
			name: 'projectName',
			message: 'Project name',
			default: 'Your project name'
		},
		{
			name: 'projectDescription',
			message: 'Project description',
			default: 'Your project description'
		},
		{
			name: 'devNames',
			message: 'What are the project developer\'s names?',
			default: 'The Avengers'
		},
		{
			name: 'oldIE',
			type: 'confirm',
			message: 'Does this project support IE8?',
			default: true,
			store: true
		},
		{
			name: 'browserify',
			type: 'confirm',
			message: 'Use Browserify to bundle your Javascript?',
			default: true,
			store: true
		},
		{
			name: 'jsNamespace',
			message: 'Choose your javascript namespace',
			default: 'KO',
			store: true,
			when: function(response) {
				return !response.browserify;
			}
		},
		{
			name: 'jsLibs',
			type: 'checkbox',
			message: 'Which Javascript libraries would you like to use?',
			choices: [
				{
					name: 'jQuery 1.x - only choose one jQuery version',
					value: 'jquery1'
				},
				{
					name: 'jQuery 2.x - only choose one jQuery version',
					value: 'jquery2'
				},
				{
					name: 'trak.js - Universal event tracking API',
					value: 'trak'
				},
				{
					name: 'Swiftclick - Eliminates the 300ms click event delay on touch devices',
					value: 'swiftclick'
				},
				{
					name: 'Include some Javascript polyfills/shims? (These are generated by the \'grunt shimly\' command)',
					value: 'shims'
				},
				{
					name: 'Use Modernizr?',
					value: 'modernizr'
				}
			],
			store: true
		},
		{
			name: 'features',
			type: 'checkbox',
			message: 'Which features would you like?',
			choices: [
				{
					name: 'Include Kickoff\'s styleguide?',
					value: 'styleguide'
				},
				{
					name: 'Use Kickoff Statix?',
					value: 'statix'
				},
				{
					name: 'Use Grunticon?',
					value: 'grunticon'
				}
			],
			store: true
		}
	];

	this.prompt(prompts, function (answers) {
		for (var key in answers) {
			this[key] = answers[key];
		}

		var jsLibs = answers.jsLibs;
		var features = answers.features;

		function hasFeature(feat, prop) {
			return prop && prop.indexOf(feat) !== -1;
		}

		console.log('jsLibs', jsLibs);
		console.log('features', features);

		// JS Libs
		this.includeTrak       = hasFeature('trak', jsLibs);
		this.includeJquery1    = hasFeature('jquery1', jsLibs);
		this.includeJquery2    = hasFeature('jquery2', jsLibs);
		this.includeSwiftclick = hasFeature('swiftclick', jsLibs);
		this.includeShims      = hasFeature('shims', jsLibs);
		this.includeModernizr  = hasFeature('modernizr', jsLibs);

		// Features
		this.includeGrunticon  = hasFeature('grunticon', features);
		this.includeStatix     = hasFeature('statix', features);
		this.includeStyleguide = hasFeature('styleguide', features);

		done();
	}.bind(this));
};

/**
 * Info
 * http://yeoman.io/generator/actions_actions.html
 * http://yeoman.io/authoring/file-system.html
 */
KickoffGenerator.prototype.packageFiles = function packageFiles() {

	// this.template('./_index.html', './index.html');
	this.fs.copyTpl(
		this.templatePath('_index.html'),
		this.destinationPath('index.html'),
		{
			projectName: this.projectName,
			projectNameSlugified: _s.slugify(this.projectName),
			oldIE: this.oldIE,
			grunticon: this.includeGrunticon,
			modernizr: this.includeModernizr,
			shims: this.includeShims
		}
	);

	if (this.includeStyleguide && !this.includeStatix) {
		// this.template('./styleguide/_index.html', './styleguide/index.html');
		this.fs.copyTpl(
			this.templatePath('styleguide/_index.html'),
			this.destinationPath('styleguide/index.html'),
			{
				projectName: this.projectName,
				projectNameSlugified: _s.slugify(this.projectName),
				oldIE: this.oldIE,
				grunticon: this.includeGrunticon,
				modernizr: this.includeModernizr,
				shims: this.includeShims
			}
		);
	}


	// CSS, SCSS, images & grunticon source directory
	this.directory('./assets/dist/css', './assets/dist/css');
	this.directory('./assets/src/scss', './assets/src/scss');
	this.directory('./assets/src/img', './assets/src/img');
	this.directory('./assets/src/grunticon', './assets/src/grunticon');


	// Javascript
	// this.directory('./assets/dist/js', './assets/dist/js');
	if (this.browserify) {
		// this.template('./assets/src/js/_script-browserify.js', './assets/src/js/script.js');
		this.fs.copyTpl(
			this.templatePath('./assets/src/js/_script-browserify.js'),
			this.destinationPath('./assets/src/js/script.js'),
			{
				projectName: this.projectName,
				devNames: this.devNames,
				browserify: this.browserify,
				includeSwiftclick: this.includeSwiftclick,
				includeTrak: this.includeTrak,
				includeJquery1: this.includeJquery1,
				includeJquery2: this.includeJquery2,
				statix: this.includeStatix,
				shims: this.includeShims
			}
		);

		this.directory('./assets/src/js/modules', './assets/src/js/modules');

	} else {
		// this.template('./assets/src/js/_script-fileArray.js', './assets/src/js/script.js');
		this.fs.copyTpl(
			this.templatePath('./assets/src/js/_script-fileArray.js'),
			this.destinationPath('./assets/src/js/script.js'),
			{
				projectName: this.projectName,
				devNames: this.devNames,
				includeJquery1: this.includeJquery1,
				includeJquery2: this.includeJquery2,
				jsNamespace: this.jsNamespace
			}
		);
	}

	if (this.modernizr) {
		this.copy('./assets/src/js/standalone/modernizr.js', './assets/src/js/standalone/modernizr.js');
	}

	if (this.shims) {
		this.copy('./assets/src/js/standalone/shims.js', './assets/src/js/standalone/shims.js');
	}


	// Grunt configs
	// this.template('_Gruntfile.js', 'Gruntfile.js');
	this.fs.copyTpl(
		this.templatePath('_Gruntfile.js'),
		this.destinationPath('Gruntfile.js'),
		{
			browserify: this.browserify,
			grunticon: this.includeGrunticon,
			modernizr: this.includeModernizr,
			statix: this.includeStatix,
			shims: this.includeShims,
			styleguide: this.includeStyleguide
		}
	);

	// this.template('./_grunt-configs/_config.js', './_grunt-configs/config.js');
	this.fs.copyTpl(
		this.templatePath('_grunt-configs/_config.js'),
		this.destinationPath('_grunt-configs/config.js'),
		{
			projectName: this.projectName,
			projectNameSlugified: _s.slugify(this.projectName),
			browserify: this.browserify,
			includeSwiftclick: this.includeSwiftclick,
			includeTrak: this.includeTrak,
			includeJquery1: this.includeJquery1,
			includeJquery2: this.includeJquery2,
			statix: this.includeStatix
		}
	);

	this.copy('./_grunt-configs/css.js', './_grunt-configs/css.js');

	// this.template('./_grunt-configs/_images.js', './_grunt-configs/images.js');
	this.fs.copyTpl(
		this.templatePath('_grunt-configs/_images.js'),
		this.destinationPath('_grunt-configs/images.js'),
		{
			grunticon: this.includeGrunticon
		}
	);

	// this.template('./_grunt-configs/_javascript.js', './_grunt-configs/javascript.js');
	this.fs.copyTpl(
		this.templatePath('_grunt-configs/_javascript.js'),
		this.destinationPath('_grunt-configs/javascript.js'),
		{
			browserify: this.browserify,
			includeJquery1: this.includeJquery1,
			includeJquery2: this.includeJquery2,
			includeShims: this.includeShims
		}
	);

	// this.template('./_grunt-configs/_server.js', './_grunt-configs/server.js');
	this.fs.copyTpl(
		this.templatePath('_grunt-configs/_server.js'),
		this.destinationPath('_grunt-configs/server.js'),
		{
			statix: this.includeStatix,
			styleguide: this.includeStyleguide
		}
	);

	// this.template('./_grunt-configs/_utilities.js', './_grunt-configs/utilities.js');
	this.fs.copyTpl(
		this.templatePath('_grunt-configs/_utilities.js'),
		this.destinationPath('_grunt-configs/utilities.js'),
		{
			browserify: this.browserify,
			statix: this.includeStatix,
			styleguide: this.includeStyleguide,
			shims: this.includeShims,
			modernizr: this.includeModernizr
		}
	);

	// this.template('./_grunt-configs/_watch.js', './_grunt-configs/watch.js');
	this.fs.copyTpl(
		this.templatePath('_grunt-configs/_watch.js'),
		this.destinationPath('_grunt-configs/watch.js'),
		{
			browserify: this.browserify,
			statix: this.includeStatix,
			grunticon: this.includeGrunticon
		}
	);

	// this.template('./_grunt-configs/_tests.js', './_grunt-configs/tests.js');
	this.fs.copyTpl(
		this.templatePath('./_grunt-configs/_tests.js'),
		this.destinationPath('./_grunt-configs/tests.js'),
		{}
	);
	this.copy('./_grunt-configs/grunticon-tpl.hbs', './_grunt-configs/grunticon-tpl.hbs');


	// this.template('_package.json', 'package.json');
	this.fs.copyTpl(
		this.templatePath('_package.json'),
		this.destinationPath('package.json'),
		{
			projectName: this.projectName,
			projectNameSlugified: _s.slugify(this.projectName),
			projectDescription: this.projectDescription,
			devNames: this.devNames,
			browserify: this.browserify,
			includeSwiftclick: this.includeSwiftclick,
			includeTrak: this.includeTrak,
			includeJquery1: this.includeJquery1,
			includeJquery2: this.includeJquery2,
			statix: this.includeStatix
		}
	);

	// this.template('_readme.md', 'readme.md');
	this.fs.copyTpl(
		this.templatePath('_readme.md'),
		this.destinationPath('readme.md'),
		{
			projectName: this.projectName,
			projectDescription: this.projectDescription,
			devNames: this.devNames
		}
	);

	// this.template('_humans.txt', 'humans.txt');
	this.fs.copyTpl(
		this.templatePath('_humans.txt'),
		this.destinationPath('humans.txt'),
		{
			projectName: this.projectName,
			projectDescription: this.projectDescription,
			devNames: this.devNames
		}
	);

	// this.template('_jshintrc', '.jshintrc');
	this.fs.copyTpl(
		this.templatePath('_jshintrc'),
		this.destinationPath('.jshintrc'),
		{
			includeJquery1: this.includeJquery1,
			includeJquery2: this.includeJquery2
		}
	);

	this.copy('editorconfig', '.editorconfig');
	this.copy('gitignore', '.gitignore');
	this.copy('gitattributes', '.gitattributes');
	this.copy('scss-lint.yml', '.scss-lint.yml');

	if (this.includeStatix) {
		this.directory('./statix/dist', './statix/dist');

		this.directory('./statix/src/data', './statix/src/data');
		this.directory('./statix/src/helpers', './statix/src/helpers');

		if (this.includeStyleguide) {
			this.directory('./statix/src/templates/layouts', './statix/src/templates/layouts');
			this.directory('./statix/src/templates/views', './statix/src/templates/views');
		} else {
			this.copy('./statix/src/templates/views/index.hbs', './statix/src/templates/views/index.hbs');
			this.copy('./statix/src/templates/layouts/default.hbs', './statix/src/templates/layouts/default.hbs');
		}

		this.directory('./statix/src/templates/partials', './statix/src/templates/partials');

		// this.template('./statix/src/templates/partials/_html_start.hbs', './statix/src/templates/partials/html_start.hbs');
		this.fs.copyTpl(
			this.templatePath('./statix/src/templates/partials/_html_start.hbs'),
			this.destinationPath('./statix/src/templates/partials/html_start.hbs'),
			{
				projectName: this.projectName,
				projectNameSlugified: _s.slugify(this.projectName),
				projectDescription: this.projectDescription,
				oldIE: this.oldIE,
				grunticon: this.includeGrunticon,
				modernizr: this.includeModernizr
			}
		);
	}
};


KickoffGenerator.prototype.install = function packageFiles() {
	opn('http://trykickoff.com/learn/checklist.html');
	this.installDependencies({
		skipInstall: this.options['skip-install'],
		callback: this._injectDependencies.bind(this) //TODO: is this still needed?
	});
};


KickoffGenerator.prototype._injectDependencies = function _injectDependencies() {
	if (this.options['skip-install']) {
		this.log(
			'After running `npm install`, inject your front end dependencies' +
			'\ninto your source code by running:' +
			'\n' +
			'\n' + chalk.yellow.bold('npm start')
		);
	} else {
		this.spawnCommand('npm', ['start']);
	}
};
