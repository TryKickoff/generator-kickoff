'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var KickoffGenerator = module.exports = function KickoffGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);

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
		this.spawnCommand('grunt', ['watch']);
	});

	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(KickoffGenerator, yeoman.generators.Base);

KickoffGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	// have Yeoman greet the user.
	// console.log(this.yeoman);
	var logger = chalk.magenta('\n\n   ##  ## ######  ####  ##  ##  ####  ###### ######\n   ## ##    ##   ##  ## ## ##  ##  ## ##     ##\n   ####     ##   ##     ####   ##  ## ####   ####\n   ## ##    ##   ##  ## ## ##  ##  ## ##     ##\n   ##  ## ######  ####  ##  ##  ####  ##     ##') + '\n\n   Created by ' + chalk.yellow('@MrMartineau') + ' & ' + chalk.cyan('@dragongraphics') + '\n   http://tmwagency.github.io/kickoff/\n';
	console.log(logger);

	var prompts =
	[
		{
			name: 'projectName',
			message: 'Name this project'
		},
		{
			name: 'devNames',
			message: 'What are the project developer\'s names?'
		},
		{
			name: 'jsNamespace',
			message: 'What javascript namespace would you like to use?'
		},
		{
			name: 'jsLibs',
			type: 'list',
			message: 'Which Javascript library do you want to use?',
			choices: [
				{
					name: 'jQuery',
					value: 'jquery'
				},
				{
					name: 'Micro libraries',
					value: 'micro'
				},
				{
					name: 'None',
					value: 'none'
				}
			]
		}
	];

	this.prompt(prompts, function (props) {
		this.projectName = props.projectName;
		this.devNames = props.devNames;
		this.jsNamespace = props.jsNamespace;
		this.jsLibs = props.jsLibs;

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
	this.copy('js/helpers/console.js', 'js/helpers/console.js');
	this.copy('js/helpers/cookies.js', 'js/helpers/cookies.js');

	this.copy('_Gruntfile.js', 'Gruntfile.js');
	this.copy('_package.json', 'package.json');
	this.copy('_bower.json', 'bower.json');

	this.template('_humans.txt', 'humans.txt');
	this.copy('_jshintrc', '.jshintrc');
	this.copy('editorconfig', '.editorconfig');
	this.copy('gitignore', '.gitignore');
};
