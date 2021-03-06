'use strict';
var util            = require('util');
var yeoman          = require('yeoman-generator');
var chalk           = require('chalk');
var updateNotifier  = require('update-notifier');
var pkg             = require('../../package.json');
var opn             = require('opn');
var _               = require('lodash');

var KickoffGenerator = module.exports = function KickoffGenerator(args, options) {
	yeoman.Base.apply(this, arguments);
};


util.inherits(KickoffGenerator, yeoman.Base);


KickoffGenerator.prototype.askFor = function () {

	// Checks for available update and returns an instance
	var notifier = updateNotifier({
		packageName: pkg.name,
		packageVersion: pkg.version,
		updateCheckInterval: 1000 * 60 // Every hour
	});

	var kickoffWelcome = chalk.white('\n  ██╗  ██╗██╗ ██████╗██╗  ██╗ ') + chalk.yellow('██████╗ ███████╗███████╗') + chalk.white('\n  ██║ ██╔╝██║██╔════╝██║ ██╔╝') + chalk.yellow('██╔═══██╗██╔════╝██╔════╝') + chalk.white('\n  █████╔╝ ██║██║     █████╔╝ ') + chalk.yellow('██║   ██║█████╗  █████╗') + chalk.white('\n  ██╔═██╗ ██║██║     ██╔═██╗ ') + chalk.yellow('██║   ██║██╔══╝  ██╔══╝') + chalk.white('\n  ██║  ██╗██║╚██████╗██║  ██╗') + chalk.yellow('╚██████╔╝██║     ██║') + chalk.white('\n  ╚═╝  ╚═╝╚═╝ ╚═════╝╚═╝  ╚═╝ ') + chalk.yellow('╚═════╝ ╚═╝     ╚═╝') + '\n\n  ' + chalk.white.bold('A Yeoman generator for the Kickoff front-end framework') + '\n  Find out more at ' + chalk.cyan('trykickoff.com') + '\n  ---\n  Kickoff version:  ' + pkg.kickoffVersion + '\n  Yeoman Generator version:  ' + pkg.version + '\n  ---\n  Kickoff is free & open-source, & maintained by:\n  ' + chalk.yellow('@MrMartineau') + ', ' + chalk.green('@AshNolan_') + ' & ' + chalk.red('@nicbell') + '. \n';

	// Have Yeoman greet the user.
	this.log(kickoffWelcome);

	// notifier.notify();
	if (notifier.update) {
		// Check for npm package update and print message if needed
		var updateMessage = chalk.yellow('   ╭────────────────────────────────────────────────╮\n   │') + ' Update available: '  + chalk.green(notifier.update.latest) + chalk.gray(' (current: ' + pkg.version + ')') + '       '+ chalk.yellow('│\n   │') + ' Run ' + chalk.cyan('npm update -g ' + pkg.name) + ' to update. ' + chalk.yellow('│\n   ╰────────────────────────────────────────────────╯\n');

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
			message: 'Description',
			default: 'Project description'
		},
		{
			name: 'repoUrl',
			message: 'What is the git repo url for this project?',
		},
		{
			name: 'devNames',
			message: 'Team members',
			default: 'Zander and Ash'
		},
		{
			name: 'features',
			type: 'checkbox',
			message: 'Which features would you like?',
			choices: [
				{
					name: 'Use Kickoff Statix for static templating and rapid prototyping?',
					value: 'statix'
				},
				{
					name: 'Provide Flexbox feature-detect? Needed if you use our grid in non-flexbox supporting browsers',
					value: 'flexboxFallback',
					default: false,
				},
			],
			store: true
		},
		{
			name: 'jsLibs',
			type: 'checkbox',
			message: 'Which Javascript libraries would you like to use?',
			choices: [
				{
					name: 'lodash',
					value: 'lodash'
				},
				{
					name: 'lazysizes - High performance (jankfree) lazy loader for images (including responsive images)',
					value: 'lazysizes'
				},
				{
					name: 'Axios - Promise based HTTP client',
					value: 'axios'
				},
				{
					name: 'Flickity carousel - Touch, responsive, flickable galleries',
					value: 'flickity'
				},
				{
					name: 'attach.js - Attaches JavaScript to HTML without messy selectors',
					value: 'attach'
				},
				{
					name: 'dominus - Lean DOM Manipulation',
					value: 'dominus'
				},
				{
					name: 'jQuery',
					value: 'jquery'
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
					name: 'Use Modernizr?',
					value: 'modernizr'
				}
			],
			store: true
		}
	];

	return this.prompt(prompts).then(function (answers) {
		for (var key in answers) {
			this[key] = answers[key];
		}

		var jsLibs = answers.jsLibs;
		var features = answers.features;

		function hasFeature(feat, prop) {
			return prop && prop.indexOf(feat) !== -1;
		}

		// JS Libs
		this.includeTrak       = hasFeature('trak', jsLibs);
		this.includeJquery     = hasFeature('jquery', jsLibs);
		this.includeSwiftclick = hasFeature('swiftclick', jsLibs);
		this.includeAxios = hasFeature('axios', jsLibs);
		this.includeLodash = hasFeature('lodash', jsLibs);
		this.includeLazysizes = hasFeature('lazysizes', jsLibs);
		this.includeFlickity = hasFeature('flickity', jsLibs);
		this.includeAttach = hasFeature('attach', jsLibs);
		this.includeDominus = hasFeature('dominus', jsLibs);
		this.includeModernizr  = hasFeature('modernizr', jsLibs);

		// Features
		this.includeStatix     = hasFeature('statix', features);
		this.flexboxFallback   = hasFeature('flexboxFallback', features);
	}.bind(this));
};


/**
 * Info
 * http://yeoman.io/generator/actions_actions.html
 * http://yeoman.io/authoring/file-system.html
 */
KickoffGenerator.prototype.packageFiles = function packageFiles() {

	this.fs.copyTpl(
		this.templatePath('_index.html'),
		this.destinationPath('index.html'),
		{
			projectName: this.projectName,
			projectNameSlugified: _.kebabCase(this.projectName),
			modernizr: this.includeModernizr,
			flexboxFallback: this.flexboxFallback,
		}
	);

	if (!this.includeStatix) {
		this.fs.copyTpl(
			this.templatePath('styleguide/_index.html'),
			this.destinationPath('styleguide/index.html'),
			{
				projectName: this.projectName,
				projectNameSlugified: _.kebabCase(this.projectName),
				modernizr: this.includeModernizr,
				flexboxFallback: this.flexboxFallback,
			}
		);
	}


	// CSS, SCSS, images source directory
	this.directory('assets/dist/css', 'assets/dist/css');
	this.directory('assets/src/scss', 'assets/src/scss');
	this.directory('assets/src/img', 'assets/src/img');
	this.directory('assets/src/svg', 'assets/src/svg');


	// Javascript
	this.fs.copyTpl(
		this.templatePath('assets/src/js/_script.js'),
		this.destinationPath('assets/src/js/script.js'),
		{
			projectName: this.projectName,
			devNames: this.devNames,
			includeSwiftclick: this.includeSwiftclick,
			includeTrak: this.includeTrak,
			includeJquery: this.includeJquery,
			includeAxios: this.includeAxios,
			includeLodash: this.includeLodash,
			includeLazysizes: this.includeLazysizes,
			includeFlickity: this.includeFlickity,
			includeDominus: this.includeDominus,
			includeAttach: this.includeAttach,
			statix: this.includeStatix,
		}
	);
	this.fs.copyTpl(
		this.templatePath('assets/src/js/styleguide.js'),
		this.destinationPath('assets/src/js/styleguide.js'),
		{}
	);
	this.fs.copyTpl(
		this.templatePath('assets/src/js/README.md'),
		this.destinationPath('assets/src/js/README.md'),
		{}
	);
	this.directory('assets/src/js/modules', 'assets/src/js/modules');
	this.directory('assets/src/js/standalone', 'assets/src/js/standalone');
	this.directory('assets/src/js/utils', 'assets/src/js/utils');

	// TOOLING FILES
	this.copy('gulpfile.js', 'gulpfile.js');
	this.fs.copyTpl(
		this.templatePath('.kickoff/config.js'),
		this.destinationPath('.kickoff/config.js'),
		{
			statix: this.includeStatix,
		}
	);
	this.fs.copyTpl(
		this.templatePath('.kickoff/index.js'),
		this.destinationPath('.kickoff/index.js'),
		{}
	);
	this.fs.copyTpl(
		this.templatePath('.kickoff/readme.md'),
		this.destinationPath('.kickoff/readme.md'),
		{}
	);
	// Gulp + webpack tasks
	this.fs.copyTpl(
		this.templatePath('.kickoff/tasks/clean.js'),
		this.destinationPath('.kickoff/tasks/clean.js'),
		{
			statix: this.includeStatix,
		}
	);
	this.fs.copyTpl(
		this.templatePath('.kickoff/tasks/compile.js'),
		this.destinationPath('.kickoff/tasks/compile.js'),
		{
			statix: this.includeStatix,
		}
	);
	this.fs.copyTpl(
		this.templatePath('.kickoff/tasks/copy.js'),
		this.destinationPath('.kickoff/tasks/copy.js'),
		{
			statix: this.includeStatix,
		}
	);
	this.fs.copyTpl(
		this.templatePath('.kickoff/tasks/css.js'),
		this.destinationPath('.kickoff/tasks/css.js'),
		{}
	);
	this.fs.copyTpl(
		this.templatePath('.kickoff/tasks/default.js'),
		this.destinationPath('.kickoff/tasks/default.js'),
		{}
	);
	this.fs.copyTpl(
		this.templatePath('.kickoff/tasks/images.js'),
		this.destinationPath('.kickoff/tasks/images.js'),
		{}
	);
	this.fs.copyTpl(
		this.templatePath('.kickoff/tasks/javascript.js'),
		this.destinationPath('.kickoff/tasks/javascript.js'),
		{}
	);
	this.fs.copyTpl(
		this.templatePath('.kickoff/tasks/serve.js'),
		this.destinationPath('.kickoff/tasks/serve.js'),
		{
			statix: this.includeStatix,
		}
	);
	this.fs.copyTpl(
		this.templatePath('.kickoff/tasks/svg.js'),
		this.destinationPath('.kickoff/tasks/svg.js'),
		{}
	);
	this.fs.copyTpl(
		this.templatePath('.kickoff/tasks/test.js'),
		this.destinationPath('.kickoff/tasks/test.js'),
		{}
	);
	this.fs.copyTpl(
		this.templatePath('.kickoff/tasks/watch.js'),
		this.destinationPath('.kickoff/tasks/watch.js'),
		{
			statix: this.includeStatix,
		}
	);
	this.fs.copyTpl(
		this.templatePath('.kickoff/tasks/webpack.config.js'),
		this.destinationPath('.kickoff/tasks/webpack.config.js'),
		{}
	);


	// Package.json
	this.fs.copyTpl(
		this.templatePath('_package.json'),
		this.destinationPath('package.json'),
		{
			projectName: this.projectName,
			projectNameSlugified: _.kebabCase(this.projectName),
			projectDescription: this.projectDescription,
			devNames: this.devNames,
			includeSwiftclick: this.includeSwiftclick,
			includeTrak: this.includeTrak,
			includeJquery: this.includeJquery,
			includeAxios: this.includeAxios,
			includeLodash: this.includeLodash,
			includeLazysizes: this.includeLazysizes,
			includeFlickity: this.includeFlickity,
			includeDominus: this.includeDominus,
			includeAttach: this.includeAttach,
			statix: this.includeStatix,
			repoUrl: this.repoUrl,
		}
	);

	this.fs.copyTpl(
		this.templatePath('_readme.md'),
		this.destinationPath('readme.md'),
		{
			projectName: this.projectName,
			projectDescription: this.projectDescription,
			devNames: this.devNames,
		}
	);

	this.fs.copyTpl(
		this.templatePath('_humans.txt'),
		this.destinationPath('humans.txt'),
		{
			projectName: this.projectName,
			projectDescription: this.projectDescription,
			devNames: this.devNames,
		}
	);

	this.copy('npmrc', '.npmrc');
	this.copy('editorconfig', '.editorconfig');
	this.copy('gitignore', '.gitignore');
	this.copy('gitattributes', '.gitattributes');
	this.copy('robots.txt', 'robots.txt');

	if (this.includeStatix) {
		this.directory('statix/dist', 'statix/dist');

		this.directory('statix/src/data', 'statix/src/data');
		this.directory('statix/src/helpers', 'statix/src/helpers');

		this.directory('statix/src/templates/views', 'statix/src/templates/views');
		this.directory('statix/src/templates/layouts', 'statix/src/templates/layouts');
		this.directory('statix/src/templates/partials', 'statix/src/templates/partials');

		this.fs.copyTpl(
			this.templatePath('statix/src/templates/_html_start.hbs'),
			this.destinationPath('statix/src/templates/partials/html_start.hbs'),
			{
				projectName: this.projectName,
				projectNameSlugified: _.kebabCase(this.projectName),
				projectDescription: this.projectDescription,
				modernizr: this.includeModernizr,
				flexboxFallback: this.flexboxFallback,
			}
		);

		// Styleguide
		this.fs.copyTpl(
			this.templatePath('statix/src/templates/_index.hbs'),
			this.destinationPath('statix/src/templates/views/styleguide/index.hbs'),
			{
				projectName: this.projectName,
			}
		);
		this.copy('statix/src/templates/styleguide-layout.hbs', 'statix/src/templates/layouts/styleguide.hbs');
	}

	this.copy('bower.json', 'bower.json');
};


KickoffGenerator.prototype.install = function packageFiles() {
	opn('http://trykickoff.com/learn/checklist.html');
	this.installDependencies();
};
