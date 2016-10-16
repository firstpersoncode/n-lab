/*
==========================================================================================

HANDLE OUTPUT

==========================================================================================
*/

var plugins_obj = require('./assets/js/config-plugins.json'),
	modules_obj = require('./assets/js/config-modules.json'),
	css_cust_obj = require("./assets/css/config-custom.json"),
	css_mobi_obj = require("./assets/css/config-mobile.json");

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

var plugins_list = new LoopArr(plugins_obj),
	modules_list = new LoopArr(modules_obj),
	css_cust_list = new LoopArr(css_cust_obj),
	css_mobi_list = new LoopArr(css_mobi_obj);

/*
==========================================================================================

TEMPLATE

==========================================================================================
*/

var banner = `/*==============================================================================================

Nasser Maronie
Front-End Developer

nasser@softwareseni.com
softwareseni.com

SOFTWARESENI

==============================================================================================*/
`,
pluginsHead = `(function($, window, undefined){
	'use strict';
`,
pluginsFooter = `}(jQuery));
`,
modulesHead = `/*==============================================================================================
modules.js
==============================================================================================*/
(function($, window, undefined){
var reinitTimer;
var Module = {		
`,
modulesFooter = `
	end: ""
};

jQuery(document).ready(function($){
	Module.init($);

	jQuery(window).resize(function($){
	    Module.onResized.init($);
	});

	jQuery(window).on('load', function($){
		Module.onLoaded.init($);
	});
});

})();
`;

module.exports = function (grunt) {

	grunt.initConfig({
/*
==========================================================================================

CONCAT

==========================================================================================
*/			
		concat: { //concatenated small chunks of files into one file
/*
==========================================================================================
js
==========================================================================================
*/
			modules: {
				options: {
					banner: modulesHead,
					footer: modulesFooter

				},
				src: modules_list.getFiles(),
				dest: ".dist/modules.js" //output file
			},
			plugins: {
				options: {
					banner: pluginsHead,
					footer: pluginsFooter
				},
				src: plugins_list.getFiles(),
				dest: ".dist/plugins.js" //output file
			},
/*
==========================================================================================
css
==========================================================================================
*/
			css_custom: {
				src: css_cust_list.getFiles(),
				dest: ".dist/custom.css" //output file
			},
			css_mobile: {
				src: css_mobi_list.getFiles(),
				dest: ".dist/mobile.css" //output file
			},
		},
/*
==========================================================================================

COMPILER

==========================================================================================
*/
		sass: { //sass compiler
			dist: {
				options: {
					style : 'expanded'
				},
				files: { //use @import to concatenated all scss files
				'.dist/compiled-sass-custom.css': 'assets/sass/config-custom.scss',
				'.dist/compiled-sass-mobile.css': 'assets/sass/config-mobile.scss'
				}
			}
		},
/*
==========================================================================================

MINIFY

==========================================================================================
*/
		cssmin: { //minify css file
			target: {
				files: [{
					expand: true,
					cwd: '.dist/',
					src: ['*.css', '!*.min.css'],
					dest: '.dist/min/',
					ext: '.min.css'
				}]
			}
		},
		uglify: { //minify js file
		    my_target: {
				files: {
					'.dist/min/modules.min.js': ['.dist/modules.js'],
					'.dist/min/plugins.min.js': ['.dist/plugins.js']
				}
		    }
		},
/*
==========================================================================================

WATCH

==========================================================================================
*/
	  	watch: {
	  		useDefault: {
	  			files: ['js/**/*.js', 'css/**/*.css', 'sass/**/*.sass'],
	  			tasks: ['sass', 'concat'],
	  		},
		},
	});

/*
==========================================================================================

LOAD NPM

==========================================================================================
*/
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
/*
==========================================================================================

REGISTER TASK

==========================================================================================
*/

	grunt.registerTask('default', ['sass', 'concat', 'cssmin', 'uglify', 'watch:useDefault']);
};
