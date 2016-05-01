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

	this.name = _.camelCase(this.name);
};

util.inherits(ModuleGenerator, yeoman.generators.Base);

ModuleGenerator.prototype.writeFiles = function(args, options) {
	this.fs.copyTpl(
		this.templatePath('module.js'),
		this.destinationPath('assets/src/js/modules/' + this.name + '.js'), {
			name: this.name
		}
	);
};
