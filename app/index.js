'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var KickoffGenerator = module.exports = function KickoffGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);

	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

	this.on('end', function () {
		this.installDependencies({ skipInstall: options['skip-install'],
		callback: function() {
			// Emit a new event - dependencies installed
			this.emit('dependenciesInstalled');
		}.bind(this) });
	});

	// Now you can bind to the dependencies installed event
	this.on('dependenciesInstalled', function() {
		if (this.jsLibs == 'jquery') { this.spawnCommand('grunt', ['jquery']); }
		this.spawnCommand('grunt', ['sass:dev', 'uglify']);
		this.spawnCommand('grunt', ['watch']);
	});
};

util.inherits(KickoffGenerator, yeoman.generators.Base);

KickoffGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	// have Yeoman greet the user.
	// console.log(this.yeoman);
	var logger = chalk.magenta('\n\n   ##  ## ######  ####  ##  ##  ####  ###### ######\n   ## ##    ##   ##  ## ## ##  ##  ## ##     ##\n   ####     ##   ##     ####   ##  ## ####   ####\n   ## ##    ##   ##  ## ## ##  ##  ## ##     ##\n   ##  ## ######  ####  ##  ##  ####  ##     ##') + '\n\n   Created by ' + chalk.yellow('@MrMartineau') + ' & ' + chalk.cyan('@AshNolan_') + '\n   http://tmwagency.github.io/kickoff/\n';
	console.log(logger);

	var prompts = [
		{
			name: 'projectName',
			message: 'Name this project',
			default: 'Kickoff'
		},
		{
			name: 'devNames',
			message: 'What are the project developer\'s names?',
			default: 'The Kickoff Team'
		},
		{
			name: 'jsNamespace',
			message: 'Choose your javascript namespace',
			default: 'KO'
		},
		{
			name: 'jsLibs',
			type: 'list',
			message: 'Which Javascript library would you like to use?',
			choices: [
				{
					name: 'jQuery',
					value: 'jquery'
				},
				{
					name: 'None',
					value: 'none'
				}
			]
		},
		{
			name: 'jsMobileDev',
			type: 'confirm',
			message: 'Do you need any dependencies for mobile?',
			default: true
		}
	];

	this.prompt(prompts, function (props) {
		this.projectName = props.projectName;
		this.devNames = props.devNames;
		this.jsNamespace = props.jsNamespace;
		this.jsLibs = props.jsLibs;
		this.jsMobileDev = props.jsMobileDev;

		cb();
	}.bind(this));
};

KickoffGenerator.prototype.app = function app() {
	this.copy('_index.html', 'index.html');

	this.directory('scss', 'scss');

	this.copy('js/_script.js', 'js/script.js');
	this.directory('js/libs', 'js/libs');
	this.directory('js/dist', 'js/dist');
	this.copy('js/helpers/_helpers.js', 'js/helpers/helpers.js');
	this.copy('js/helpers/_getViewportDimensions.js', 'js/helpers/getViewportDimensions.js');
	this.copy('js/helpers/console.js', 'js/helpers/console.js');
	this.copy('js/helpers/cookies.js', 'js/helpers/cookies.js');
	this.copy('js/helpers/log.js', 'js/helpers/log.js');

	this.copy('_Gruntfile.js', 'Gruntfile.js');
	this.copy('_package.json', 'package.json');
	this.copy('_bower.json', 'bower.json');
	this.copy('_docs/_styleguide.html', '_docs/styleguide.html');

	this.template('_humans.txt', 'humans.txt');
	this.copy('_jshintrc', '.jshintrc');
	this.copy('editorconfig', '.editorconfig');
	this.copy('gitignore', '.gitignore');
};
