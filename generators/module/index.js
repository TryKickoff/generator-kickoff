'use strict';
var util            = require('util');
var yeoman          = require('yeoman-generator');
var _s              = require('underscore.string');


var ModuleGenerator = module.exports = function ModuleGenerator(args, options) {
	yeoman.Base.apply(this, arguments);

	// this.argument('namespace', {
	// 	type: String,
	// 	required: true,
	// 	description: 'Generator namespace'
	// });
	// this.option('module', {
	// 	desc: 'Add a js module',
	// 	type: String
	// });

	// this.option('component', {
	// 	desc: 'Add a CSS component',
	// 	type: String
	// });

	// this.env.options['module'] = this.options['module'];
	// this.env.options['component'] = this.options['component'];

	console.log(this);
	// console.log(this.options);
};

ModuleGenerator.prototype.writeFiles = function(args, options) {
	// console.log(args, options);
	var name = options.module.name; // FIXME
	var filename = _s.slugify(name);

	this.fs.copyTpl(
		this.templatePath('module.js'),
		this.destinationPath('assets/src/js/modules/' + filename + '.js'), {
			name: name
		}
	);
};
