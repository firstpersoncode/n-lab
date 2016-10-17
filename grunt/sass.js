module.exports = {
/*
==========================================================================================

COMPILER

==========================================================================================
*/
	dist: {
		options: {
			style : 'expanded'
		},
		files: { //use @import to concatenated all scss files
		'.prebuild/compiled-sass-custom.css': '_assets/sass/config-custom.scss',
		'.prebuild/compiled-sass-mobile.css': '_assets/sass/config-mobile.scss'
		}
	}
};