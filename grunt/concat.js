var modules_obj = require('../_assets/js/config-modules.json'),
	plugins_obj = require('../_assets/js/config-plugins.json'),	
	custom_obj = require('../_assets/js/config-custom.json'),
	css_cust_obj = require("../_assets/css/config-custom.json"),
	css_mobi_obj = require("../_assets/css/config-mobile.json"),
	js_target = require("../config/js.json"),
	css_target = require("../config/css.json");

var loop = require('./loopArr.js');

var modules_list = new loop(modules_obj);
	plugins_list = new loop(plugins_obj),
	custom_list = new loop(custom_obj),
	css_cust_list = new loop(css_cust_obj),
	css_mobi_list = new loop(css_mobi_obj),
	css_dist = new loop(css_target),
	js_dist = new loop(js_target);

var temp = require('./template.js');

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
	modules: {
		options: {
			banner: temp.modulesBanner.head,
			footer: temp.modulesBanner.footer

		},
		src: modules_list.getFiles(),
		dest: ".prebuild/modules.js" //output file
	},
	plugins: {
		options: {
			banner: temp.pluginsBanner.head,
			footer: temp.pluginsBanner.footer
		},
		src: plugins_list.getFiles(),
		dest: ".prebuild/plugins.js" //output file
	},
	custom: {
		options: {
			banner: temp.custom
		},
		src: custom_list.getFiles(),
		dest: ".prebuild/custom.js" //output file
	},
/*
==========================================================================================
css
==========================================================================================
*/
	css_custom: {
		src: css_cust_list.getFiles(),
		dest: ".prebuild/custom.css" //output file
	},
	css_mobile: {
		src: css_mobi_list.getFiles(),
		dest: ".prebuild/mobile.css" //output file
	},

	js: {
		src: [
			".prebuild/plugins.js",
			".prebuild/modules.js",
			".prebuild/custom.js"
		],
		dest: js_dist.getOutput() //output file
	},
	css: {
		src: [
			".prebuild/compiled-sass-custom.css",
			".prebuild/compiled-sass-mobile.css",
			".prebuild/custom.css",
			".prebuild/mobile.css"
		],
		dest: css_dist.getOutput() //output file
	}

};