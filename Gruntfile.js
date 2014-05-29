module.exports = function (grunt) {

	grunt.initConfig({
		//loading project config file
		pkg: grunt.file.readJSON('package.json')
	});

	grunt.loadNpmTasks('grunt-contrib-example');

	//task registration
  	grunt.registerTask('default', ['example', 'example']);
}