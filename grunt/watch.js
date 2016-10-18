module.exports = {
/*
==========================================================================================

WATCH

==========================================================================================
*/

	useDefault: {
		files: ['_assets/js/**/*.js', '_assets/css/**/*.css', '_assets/sass/**/*.sass'],
		tasks: [
			'sass',
			'newer:concat:modules',
			'newer:concat:plugins',
			'newer:concat:custom',
			'newer:concat:css_custom',
			'newer:concat:css_mobile'
		]
	}
};