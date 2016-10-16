
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
