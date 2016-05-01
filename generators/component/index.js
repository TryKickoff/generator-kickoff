'use strict';
var util = require('util');
var fs = require('fs');
var yeoman = require('yeoman-generator');
var _ = require('lodash');
var updateSection = require('update-section');


var ComponentGenerator = module.exports = function ComponentGenerator(args, options) {
	yeoman.Base.apply(this, arguments);

	this.argument('name', {
		type: String,
		required: true
	});

	this.name = _.kebabCase(this.name);

	// Write new file @import to _dependencies.scss
	var depsContent = fs.readFileSync('assets/src/scss/_dependencies.scss', {
		encoding: 'utf-8'
	});
	var update = '@import "components/' + this.name +'"\n// YEOMANSTART -- COMPONENT\n// YEOMANEND -- COMPONENT';
	var updated = updateSection(depsContent, update, matchesStart, matchesEnd);
	fs.writeFileSync('assets/src/scss/_dependencies.scss', updated, {
		encoding: 'utf-8'
	});
	console.log('depsContent', update, updated);
};

util.inherits(ComponentGenerator, yeoman.generators.Base);

ComponentGenerator.prototype.writeFiles = function(args, options) {
	this.fs.copyTpl(
		this.templatePath('_component.scss'),
		this.destinationPath('assets/src/scss/components/_' + this.name + '.scss'), {
			name: this.name
		}
	);
};

function matchesStart(line) {
  return (/\/ YEOMANSTART -- COMPONENT/).test(line);
}

function matchesEnd(line) {
  return (/\/ YEOMANEND -- COMPONENT/).test(line);
}
