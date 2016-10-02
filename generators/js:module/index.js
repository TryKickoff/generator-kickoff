'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var _ = require('lodash');


var ModuleGenerator = module.exports = function ModuleGenerator(args, options) {
	yeoman.Base.apply(this, arguments);

	this.argument('name', {
		type: String,
		required: true
	});

	this.argument('path', {
		type: String,
		required: false
	});

	this.name = _.camelCase(this.name);
	this.path = this.path || 'assets/src/js/modules';
};

util.inherits(ModuleGenerator, yeoman.generators.Base);

ModuleGenerator.prototype.writeFiles = function(args, options) {
	this.fs.copyTpl(
		this.templatePath('module.js'),
		this.destinationPath(this.path + '/' + this.name + '.js'), {
			name: this.name
		}
	);
};
