'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var KickoffGenerator = module.exports = function KickoffGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
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

  var prompts = [
  // {
  //   type: 'confirm',
  //   name: 'someOption',
  //   message: 'Would you like to enable this option?',
  //   default: true
  // },
  {
    name: 'projectName',
    message: 'Name this project'
  },
  {
    name: 'devNames',
    message: 'What are the project developer\'s names?'
  }];

  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;
    this.devNames = props.devNames;

    cb();
  }.bind(this));
};

KickoffGenerator.prototype.app = function app() {
  // this.mkdir(this.projectName);
  // this.mkdir(this.projectName + '/templates');

  this.directory('scss', 'scss');
  this.copy('scss/kickoff.scss', 'scss/' + this.projectName + '.scss');
  this.copy('scss/kickoff-old-ie.scss', 'scss/' + this.projectName + '-old-ie.scss');

  this.directory('js', 'js');

  this.template('_humans.txt', 'humans.txt');
  this.copy('_index.html', 'index.html');
  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
  this.copy('Gruntfile.js', 'Gruntfile.js');
};

KickoffGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('gitignore', '.gitignore');
};
