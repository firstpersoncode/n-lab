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