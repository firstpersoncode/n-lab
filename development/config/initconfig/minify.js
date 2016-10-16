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