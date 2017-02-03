module.exports = function(grunt){
	var requirejs = require("requirejs");
	var request = require('request');
	var fs = require("fs");
	var fatal = grunt.fail.fatal
	var log = grunt.log
	var buildConfigMain = grunt.file.readJSON("build.js");

	var appConfig = grunt.file.read('app.js');


	grunt.registerTask('default',['download-cdn','build']);

	grunt.registerTask('download-cdn','',function(){
		var done = this.async();
		var configPaths = buildConfigMain.paths || {};

		//extract the paths component from our app config
		var regex = /"paths":\s+(\{[^}]+?\})/;
		var downloadfilesconfig = {};
		var paths = JSON.parse(regex.exec(appConfig)[1]);
		for(var key in paths){
			var path = paths[key];
			if(Array.isArray(path)){
				path = path[0];
			}
			if(path.indexOf('//') == 0){
				path = "http:"+path;
			}
			if(path.indexOf('http') == 0 || path.indexOf('/') == 0){
				var parts = path.split("/");
				var dest = parts[parts.length-1];
				if(path.indexOf('http') == 0){
					downloadfilesconfig['lib/' + dest + '.js'] = path + '.js';
				}
				//remap our paths in our configuration file
				configPaths[key] = dest;
			}
		}
		buildConfigMain.paths = configPaths;
		grunt.config('downloadfiles',downloadfilesconfig);
		grunt.task.run(['downloadfiles']);

		done();

	});

	// Build static assets using r.js
	grunt.registerTask("build", "Run the r.js build script", function() {
		grunt.task.requires('download-cdn');

		var done = this.async();

		log.writeln("Running build...");
		requirejs.optimize(buildConfigMain, function(output) {
			log.writeln(output);
			log.ok("Main build complete.");
			//clean out the JS files we downloaded
			for(var key in buildConfigMain.paths){
				var file = buildConfigMain.paths[key];
				fs.unlink('lib/'+file+'.js');
			}

			done();
		}, function(err) {
			fatal("Main build failure: " + err);
		});


	});

	grunt.registerMultiTask('downloadfiles','', function(){
		var done = this.async();
		var url = this.data;
		var dest = this.target;

		request.get(url).on('response',function(resp){
			if(resp.statusCode !== 200){
				fatal('error downloading file: '+url);
				done(false);
			}
		}).on('error', function(err) {
			fatal('error download file: '+url+' - '+err);
			done(false);
		}).pipe(fs.createWriteStream(dest).on('finish', function() {
			this.close();
			done();
		}));
	});

};