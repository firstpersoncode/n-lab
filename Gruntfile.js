/*==============================================================================================

Grunt config

Nasser Maronie
Front-End Developer

nasser@softwareseni.com
softwareseni.com

SOFTWARESENI


==============================================================================================*/
var library_obj = require('./config/js/library.json'),
	js_obj = require('./config/js/js.json'),
	css_desk_obj = require("./config/css/css-desktop.json"),
	css_mobi_obj = require("./config/css/css-mobile.json");

var library_arr = ['js/library/head.js'],
	js_arr = ['js/library/.build/n-lab.js','js/main/head.js'],
	css_desk_arr = [];
	css_mobi_arr = [];

function LoopArr(obj, arr){// class for looping json object's array
	this.files = arr;
	this.output = [];	
	this.getFiles = function(){
		for(var i = 0; i < obj.development.length; i++){
			this.files.push(obj.development[i].file);
			console.log('\x1b[36m%s\x1b[0m \n'+'\x1b[33m%s\x1b[0m \n', " - Merging: " + obj.development[i].name, " - Source: " + obj.development[i].file);
		}
		return this.files;
	}
	this.getOutput = function(args){		
		for(var i = 0; i < obj.output.length; i++){
			this.output.push(obj.output[i].file);
			console.log('\x1b[32m%s\x1b[0m \n'+'\x1b[33m%s\x1b[0m \n', " - Merged: " + obj.output[i].name, " - Output: " + obj.output[i].file);
		}
		if(this.output.length <= 1){
			return this.output.toString();
		}else{
			return this.output;
		}		
	}	
}

var Library_list = new LoopArr(library_obj, library_arr),
	Js_list = new LoopArr(js_obj, js_arr),
	Css_desk_list = new LoopArr(css_desk_obj, css_desk_arr),
	Css_mobi_list = new LoopArr(css_mobi_obj, css_mobi_arr);	

Library_list.getFiles();
Library_list.files.push("js/library/end.js");
Js_list.getFiles();
Js_list.files.push("js/main/end.js");


module.exports = function (grunt) {
	grunt
		.initConfig({			
			concat: { //concatenated small chunks of files into one file
				
/*
==========================================================================================

JAVASCRIPT

==========================================================================================
*/ 
				js: {
					options: {
						banner: 
`/*==============================================================================================

main.js 1.0.0

Nasser Maronie
Front-End Developer

nasser@softwareseni.com
softwareseni.com

SOFTWARESENI

==============================================================================================*/
`
					},
					src: Js_list.files,
					dest: Js_list.getOutput() //output file
				},
				libs: {
					src: Library_list.files,
					dest: Library_list.getOutput() //output file
				},
/*
==========================================================================================

CSS FOR DESKTOP

==========================================================================================
*/ 
				cssDesktop: {
					options: {
						banner:
`/*==============================================================================================

main-desktop.css 1.0.0

Nasser Maronie
Front-End Developer

nasser@softwareseni.com
softwareseni.com

SOFTWARESENI

==============================================================================================*/
` 
					},
					src: Css_desk_list.getFiles(),
					dest: Css_desk_list.getOutput() //output file
				},
/*
==========================================================================================

CSS FOR MOBILE

==========================================================================================
*/ 
				cssMobile: {
					options: {
						banner:
`/*==============================================================================================

main-mobile.css 1.0.0

Nasser Maronie
Front-End Developer

nasser@softwareseni.com
softwareseni.com

SOFTWARESENI

==============================================================================================*/
` 
					},
					src: Css_mobi_list.getFiles(),
					dest: Css_mobi_list.getOutput() //output file
				}
			},
/*
==========================================================================================

SASS

==========================================================================================
*/
			sass: { //sass compiler
				dist: {
					options: {
						style : 'expanded'
					},
					files: { //use @import to concatenated all scss files
					'css/compiled/compiled-sass-desktop.css': 'config/sass/desktop.scss',
					'css/compiled/compiled-sass-mobile.css': 'config/sass/mobile.scss'
					}
				}
			},
			less: { //less compiler
				development: {
					options: {
						optimization: 2
					},
					files: { //use @import to concatenated all less files
						'css/compiled/compiled-less-desktop.css' : 'config/less/desktop.less',
						'css/compiled/compiled-less-mobile.css' : 'config/less/mobile.less'
					}
				}
			},
/*
==========================================================================================

MINIFY

==========================================================================================
*/
			// cssmin: { //minify css file
			// 	target: {
			// 		files: [{
			// 			expand: true,
			// 			cwd: '.build/css',
			// 			src: ['*.css', '!*.min.css'],
			// 			dest: '.build/css',
			// 			ext: '.min.css'
			// 		}]
			// 	}
			// },
			// uglify: { //minify js file
			//     my_target: {
			// 		files: {
			// 			'.build/js/main.min.js': ['.build/js/main.js']
			// 		}
			//     }
			// },
		  	watch: {
				js: {
					files: ['js/**/*.js'],
					tasks: ['concat:libs', 'concat:js'],
				},
				css: {
					files: ['css/**/*.css', 'sass/**/*.scss', 'less/**/*.less'],
					tasks: ['sass', 'less', 'concat:cssDesktop', 'concat:cssMobile'],
				},
			},
		});
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-less');

	grunt.registerTask('default', ['sass', 'less', 'concat', 'watch']);
};