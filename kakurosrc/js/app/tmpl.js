define(['underscore','text!templates/boxes.html','text!templates/numbersform.html','text!templates/output.html'], function(_) {
	_.templateSettings.variable = "rc";
	var templates = [];
	templates['boxes'] = _.template(arguments[1]);
	templates['numbersform'] = _.template(arguments[2]);
	templates['output'] = _.template(arguments[3]);

	return templates;
});

