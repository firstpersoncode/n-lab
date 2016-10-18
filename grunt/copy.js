var css_target = require("../_config/css.json");
module.exports = {
	sass_map : {
		expand : true,
		cwd : '.prebuild',
		src : 'sass.css.map',
		dest : css_target.output[0].sassmap.toString()
	}
};
