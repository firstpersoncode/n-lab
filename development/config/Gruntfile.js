module.exports = function (grunt) {

	grunt.initConfig({
		concat: {
			gruntConfig: {
				options: {
					banner: `
	grunt.initConfig({
`,
					footer: `
	});
`
				},
				src: [
					'initconfig/concat.js',
					'initconfig/compiler.js',
					'initconfig/minify.js',
					'initconfig/watch.js'
				],
				dest: "initconfig/.dist/dist-config.js"
			},
			gruntDist: {
				options: {
					banner: `
module.exports = function (grunt) {
`,
					footer: `
};
`
				},
				src: [
					"initconfig/.dist/dist-config.js",
					"loadNpm.js",
					"registerTask.js"
				],
				dest: ".dist/dist-grunt.js"
			},
			createGrunt: {
				src: [
					"handler.js",
					".dist/dist-grunt.js"
				],
				dest: "../Gruntfile.js"
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.registerTask('default', ['concat']);
};