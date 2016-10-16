/*
==========================================================================================

HANDLE OUTPUT

==========================================================================================
*/

var js_obj = require('./js.json'),
	css_obj = require('./css.json');

function LoopArr(obj){// class for looping json object's array
	this.files = [];
	this.dist = [];	
	this.getFiles = function(){
		for(var i = 0; i < obj.development.length; i++){
			this.files.push(obj.development[i].file);
			console.log('\x1b[36m%s\x1b[0m \n'+'\x1b[33m%s\x1b[0m \n', " - Merging: " + obj.development[i].name, " - Source: " + obj.development[i].file);
		}
		return this.files;
	}
	this.getOutput = function(){		
		for(var i = 0; i < obj.output.length; i++){
			this.dist.push(obj.output[i].file);
			console.log('\x1b[32m%s\x1b[0m \n'+'\x1b[33m%s\x1b[0m \n', " - Merged: " + obj.output[i].name, " - Output: " + obj.output[i].file);
		}
		if(this.dist.length <= 1){
			return this.dist.toString();
		}else{
			return this.dist;
		}		
	}	
}

var js_list = new LoopArr(js_obj),
	css_list = new LoopArr(css_obj);

	js_list.getOutput();
	css_list.getOutput();

module.exports = function (grunt) {

	grunt.initConfig({			
		concat: { //concatenated small chunks of files into one file
/*
==========================================================================================

main.js output

==========================================================================================
*/
			m: {
				src: [
					"development/.dist/modules.js"
				],
				dest: js_list.dist.toString() //output file
			},
			p_m: {
				src: [
					"development/.dist/plugins.js",
					"development/.dist/modules.js",
				],
				dest: js_list.dist.toString() //output file
			},
			b_m: {
				src: [
					"modules/bootstrap/.dist/bootstrap.js",
					"development/.dist/modules.js",
				],
				dest: js_list.dist.toString() //output file
			},
			j_m: {
				src: [
					"modules/jquery/dist/jquery.js",
					"development/.dist/modules.js",
				],
				dest: js_list.dist.toString() //output file
			},
			b_p_m: {
				src: [
					"modules/bootstrap/.dist/bootstrap.js",
					"development/.dist/plugins.js",
					"development/.dist/modules.js",
				],
				dest: js_list.dist.toString() //output file
			},
			j_p_m: {
				src: [
					"modules/jqeury/dist/jquery.js",
					"development/.dist/plugins.js",
					"development/.dist/modules.js",
				],
				dest: js_list.dist.toString() //output file
			},
			j_b_m: {
				src: [
					"modules/jqeury/dist/jquery.js",
					"modules/bootstrap/.dist/bootstrap.js",
					"development/.dist/modules.js",
				],
				dest: js_list.dist.toString() //output file
			},
			j_b_p_m: {
				src: [
					"modules/jquery/dist/jquery.js",
					"modules/bootstrap/.dist/bootstrap.js",
					"development/.dist/plugins.js",
					"development/.dist/modules.js",
				],
				dest: js_list.dist.toString() //output file
			},
/*
==========================================================================================

main.css output

==========================================================================================
*/
			c:{
				src: [
					"development/.dist/custom.css",
					"development/.dist/mobile.css"
				],
				dest: css_list.dist.toString()
			},
			s:{
				src: [
					"development/.dist/compiled-sass-custom.css",
					"development/.dist/compiled-sass-mobile.css"
				],
				dest: css_list.dist.toString()
			},
			s_c:{
				src: [
					"development/.dist/compiled-sass-custom.css",					
					"development/.dist/custom.css",
					"development/.dist/compiled-sass-mobile.css",
					"development/.dist/mobile.css"
				],
				dest: css_list.dist.toString()
			},
			b_s:{
				src: [
					"modules/bootstrap/.dist/bootstrap.css",
					"development/.dist/compiled-sass-custom.css",
					"development/.dist/compiled-sass-mobile.css"
				],
				dest: css_list.dist.toString()
			},
			b_c:{
				src: [
					"modules/bootstrap/.dist/bootstrap.css",
					"development/.dist/custom.css",
					"development/.dist/mobile.css"
				],
				dest: css_list.dist.toString()
			},
			b_s_c:{
				src: [
					"modules/bootstrap/.dist/bootstrap.css",
					"development/.dist/compiled-sass-custom.css",					
					"development/.dist/custom.css",
					"development/.dist/compiled-sass-mobile.css",
					"development/.dist/mobile.css"
				],
				dest: css_list.dist.toString()
			},
		},
		cssmin: { //minify css file
			target: {
				files: [{
					expand: true,
					cwd: '.dist/',
					src: ['*.css', '!*.min.css'],
					dest: '.dist/',
					ext: '.min.css'
				}]
			}
		},
		uglify: { //minify js file
		    my_target: {
				files: {
					'.dist/main.min.js': ['.dist/main.js']
				}
		    }
		},
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['concat', 'cssmin', 'uglify']);
	grunt.registerTask('jquery-bootstrap-plugins-modules', 
		[
			'concat:j_b_p_m',
			'uglify'
		]
	);
	grunt.registerTask('bootstrap-plugins-modules', 
		[
			'concat:b_p_m',
			'uglify'
		]
	);
	grunt.registerTask('jquery-plugins-modules', 
		[
			'concat:j_p_m', 
			'uglify'
		]
	);
	grunt.registerTask('jquery-bootstrap-modules', 
		[
			'concat:j_b_m', 
			'uglify'
		]
	);
	grunt.registerTask('bootstrap-modules', 
		[
			'concat:b_m', 
			'uglify'
		]
	);
	grunt.registerTask('jquery-modules', 
		[
			'concat:j_m', 
			'uglify'
		]
	);
	grunt.registerTask('plugins-modules', 
		[
			'concat:p_m', 
			'uglify'
		]
	);
	grunt.registerTask('modules', 
		[
			'concat:m', 
			'uglify'
		]
	);

	grunt.registerTask('bootstrap-sass-css', 
		[
			'concat:b_s_c', 
			'cssmin'
		]
	);
	grunt.registerTask('bootstrap-sass', 
		[
			'concat:b_s', 
			'cssmin'
		]
	);
	grunt.registerTask('bootstrap-css', 
		[
			'concat:b_c', 
			'cssmin'
		]
	);
	grunt.registerTask('sass-css', 
		[
			'concat:s_c', 
			'cssmin'
		]
	);
	grunt.registerTask('sass', 
		[
			'concat:s', 
			'cssmin'
		]
	);
	grunt.registerTask('css', 
		[
			'concat:c', 
			'cssmin'
		]
	);
};
