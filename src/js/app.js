requirejs.config({
	"baseUrl": "js/lib",
	"paths": {
		"app": "../app",
		"jquery": "https://code.jquery.com/jquery-1.12.3",
		"jquery-ui": "https://code.jquery.com/ui/1.11.4/jquery-ui",
		"underscore": "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore",
		"tmpl": "../app/tmpl",
		"bootstrap": "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap",
		"templates": "../../templates"
	},
	"shim": {
		"bootstrap": ["jquery"]
	}
});
require(["app/main"]);