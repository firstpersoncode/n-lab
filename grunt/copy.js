var css_target = require("../_config/css.json");
module.exports = {
	custom_map : {
		expand : true,
		cwd : '.prebuild',
		src : 'compiled-sass-custom.css.map',
		dest : css_target.output[0].sassmap.toString()
	},
	mobile_map : {
		expand : true,
		cwd : '.prebuild',
		src : 'compiled-sass-mobile.css.map',
		dest : css_target.output[0].sassmap.toString()
	}
};
