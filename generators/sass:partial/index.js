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

	this.argument('path', {
		type: String,
		required: false
	});

	this.name = _.kebabCase(this.name);
	this.path = this.path || 'assets/src/scss';

	console.log('path', this.path);

	// Write new file @import to kickoff.scss
	var depsContent = fs.readFileSync(this.path + '/kickoff.scss', {
		encoding: 'utf-8'
	});
	var update = '@import "partials/' + this.name +'";\n// yo:start -- partial\n// yo:end -- partial';
	var updated = updateSection(depsContent, update, matchesStart, matchesEnd);
	fs.writeFileSync(this.path + '/kickoff.scss', updated, {
		encoding: 'utf-8'
	});
};

util.inherits(ComponentGenerator, yeoman.generators.Base);

ComponentGenerator.prototype.writeFiles = function(args, options) {
	this.fs.copyTpl(
		this.templatePath('_partial.scss'),
		this.destinationPath(this.path + '/partials/_' + this.name + '.scss'), {
			name: this.name
		}
	);
};

function matchesStart(line) {
  return (/\/ yo:start -- partial/).test(line);
}

function matchesEnd(line) {
  return (/\/ yo:end -- partial/).test(line);
}
