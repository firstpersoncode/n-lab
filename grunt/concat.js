var js_obj = require('../_assets/js/config-js.json'),
	css_obj = require("../_assets/css/config-css.json"),
	js_target = require("../_config/js.json"),
	css_target = require("../_config/css.json");

var loop = require('./loopArr.js');

var js_list = new loop(js_obj);
	css_list = new loop(css_obj),
	css_dist = new loop(css_target),
	js_dist = new loop(js_target);

js_dist.getOutput();
css_dist.getOutput();

module.exports = {
/*
==========================================================================================

CONCAT

==========================================================================================
*/			
/*
==========================================================================================
js
==========================================================================================
*/
	js: {
		src: js_list.getFiles(),
		dest: ".prebuild/js.js" //output file
	},
/*
==========================================================================================
css
==========================================================================================
*/
	cs: {
		src: css_list.getFiles(),
		dest: ".prebuild/css.css" //output file
	},
/*
==========================================================================================
dist
==========================================================================================
*/
	j : {
		src : ['.prebuild/js.js'],
		dest : js_dist.dist.toString()
	},
	c: {
		src: ['.prebuild/css.css'],
		dest: css_dist.dist.toString() //output file
	},
	sas: {
		src: ['.prebuild/sass.css'],
		dest: css_dist.dist.toString() //output file
	},
	sas_c : {
		src : [
			'.prebuild/sass.css',
			'.prebuild/css.css'
		]
		dest: css_dist.dist.toString()
	}
};