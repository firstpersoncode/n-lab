/*
==========================================================================================

HANDLE OUTPUT

==========================================================================================
*/

var bootstrap_obj = require('./config-bootstrap-js.json');

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

var bootstrap_list = new LoopArr(bootstrap_obj);

module.exports = function (grunt) {

	grunt.initConfig({			
		concat: { //concatenated small chunks of files into one file
			bootstrap: {
				src: bootstrap_list.getFiles(),
				dest: ".dist/bootstrap.js" //output file
			},
		},
		sass: { //sass compiler
			dist: {
				options: {
					style : 'expanded'
				},
				files: { //use @import to concatenated all scss files
				'.dist/bootstrap.css': 'config-bootstrap-sass.scss'
				}
			}
		},
		cssmin: { //minify css file
			target: {
				files: [{
					expand: true,
					cwd: '.dist',
					src: ['bootstrap.css'],
					dest: '.dist',
					ext: '.min.css'
				}]
			}
		},
		uglify: { //minify js file
		    my_target: {
				files: {
					'.dist/bootstrap.min.js': ['.dist/bootstrap.js']
				}
		    }
		},
	  	watch: {
	  		useDefault: {
	  			files: ['js/**/*.js', 'css/**/*.css', 'sass/**/*.sass'],
	  			tasks: ['sass', 'concat'],
	  		},
		},
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.registerTask('default', ['sass', 'concat', 'cssmin', 'uglify']);
	grunt.registerTask('develope', ['sass', 'concat', 'cssmin', 'uglify', 'watch:useDefault']);
};
