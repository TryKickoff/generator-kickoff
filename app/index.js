'use strict';
var util           = require('util');
var path           = require('path');
var yeoman         = require('yeoman-generator');
var yosay          = require('yosay');
var chalk          = require('chalk');
var updateNotifier = require('update-notifier');


var KickoffGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');
    // console.log(this.options);

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies({ skipInstall: this.options['skip-install'],
        callback: function () {
          // Emit a new event - dependencies installed
          this.emit('dependenciesInstalled');
        }.bind(this) });
      }
    });

    // Now you can bind to the dependencies installed event
    this.on('dependenciesInstalled', function () {
      this.spawnCommand('grunt', ['serve']);
    });
  },

  askFor: function () {
    var done     = this.async();

  	var notifier = updateNotifier({
	    packageName: 'generator-kickoff',
	    packageVersion: '0.8.0'
	});

    if (notifier.update) {
      // Notify using the built-in convenience method
      notifier.notify();
    }

    var kickoffWelcome = chalk.magenta('\n   ##  ## ######  ####  ##  ##  ####  ###### ######\n   ## ##    ##   ##  ## ## ##  ##  ## ##     ##\n   ####     ##   ##     ####   ##  ## ####   ####\n   ## ##    ##   ##  ## ## ##  ##  ## ##     ##\n   ##  ## ######  ####  ##  ##  ####  ##     ##') + '\n\n   A Yeoman generator for the Kickoff front-end framework\n\n   Created by ' + chalk.yellow('@MrMartineau') + ' & ' + chalk.green('@AshNolan_') + '\n   ' + chalk.cyan('http://tmwagency.github.io/kickoff/') + '\n';
    // Have Yeoman greet the user.
    this.log(kickoffWelcome);

    var prompts = [
      {
        name: 'projectName',
        message: 'Project name',
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
        name: 'statix',
        type: 'confirm',
        message: 'Do you want to use Kickoff Statix?',
        default: false
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
            name: 'Cookies - JavaScript Client-Side Cookie Manipulation Library',
            value: 'cookies'
          }
        ]
      }
    ];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;
      this.devNames    = props.devNames;
      this.jsNamespace = props.jsNamespace;
      this.statix      = props.statix;
      this.jsLibs      = props.jsLibs;

      done();
    }.bind(this));
  },

  app: function () {
    this.template('_index.html', 'index.html');
    this.template('_docs/_styleguide.html', '_docs/styleguide.html');
    this.template('_docs/_index.html', '_docs/index.html');

    this.directory('scss', 'scss');

    // Grunt configs
    this.template('_grunt-configs/_css.js', '_grunt-configs/css.js');
    this.template('_grunt-configs/_icons.js', '_grunt-configs/icons.js');
    this.template('_grunt-configs/_javascript.js', '_grunt-configs/javascript.js');
    this.template('_grunt-configs/_server.js', '_grunt-configs/server.js');
    this.template('_grunt-configs/_utilities.js', '_grunt-configs/utilities.js');
    this.template('_grunt-configs/_watch.js', '_grunt-configs/watch.js');

    this.template('js/_script.js', 'js/script.js');
    this.directory('js/libs', 'js/libs');
    this.directory('js/dist', 'js/dist');
    this.template('js/helpers/_helpers.js', 'js/helpers/helpers.js');
    this.copy('js/helpers/console.js', 'js/helpers/console.js');
    this.copy('js/helpers/log.js', 'js/helpers/log.js');
    this.copy('js/helpers/shims.js', 'js/helpers/shims.js');

    this.template('_Gruntfile.js', 'Gruntfile.js');
    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');

    this.template('_humans.txt', 'humans.txt');
    this.template('_jshintrc', '.jshintrc');
    this.copy('editorconfig', '.editorconfig');
    this.copy('gitignore', '.gitignore');
    this.copy('bowerrc', '.bowerrc');
    this.copy('jscs.json', '.jscs.json');

    if (this.statix) {
      this.directory('statix/src', 'statix/src');
      this.directory('statix/dist', 'statix/dist');
      this.template('statix/src/templates/includes/_html_start.hbs', 'statix/src/templates/includes/html_start.hbs');
    }
  }
});

module.exports = KickoffGenerator;
