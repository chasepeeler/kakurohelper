define(['underscore','text!templates/boxes.html','text!templates/numbersform.html','text!templates/output.html','text!templates/spinner.html','text!templates/error.html'], function(_) {
	_.templateSettings.variable = "rc";
	var templates = [];
	templates['boxes'] = _.template(arguments[1]);
	templates['numbersform'] = _.template(arguments[2]);
	templates['output'] = _.template(arguments[3]);
	templates['spinner'] = _.template(arguments[4]);
	templates['error'] = _.template(arguments[5]);

	return templates;
});

