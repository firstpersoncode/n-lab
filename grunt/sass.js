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
		'.prebuild/sass.css': '_assets/sass/config-sass.scss',
		}
	}
};