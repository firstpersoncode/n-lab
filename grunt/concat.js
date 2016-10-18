var modules_obj = require('../_assets/js/config-modules.json'),
	plugins_obj = require('../_assets/js/config-plugins.json'),	
	custom_obj = require('../_assets/js/config-custom.json'),
	css_cust_obj = require("../_assets/css/config-custom.json"),
	css_mobi_obj = require("../_assets/css/config-mobile.json"),
	js_target = require("../_config/js.json"),
	css_target = require("../_config/css.json");

var loop = require('./loopArr.js');

var modules_list = new loop(modules_obj);
	plugins_list = new loop(plugins_obj),
	custom_list = new loop(custom_obj),
	css_cust_list = new loop(css_cust_obj),
	css_mobi_list = new loop(css_mobi_obj),
	css_dist = new loop(css_target),
	js_dist = new loop(js_target);

var temp = require('./template.js');

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
/*
==========================================================================================
dist
==========================================================================================
*/
	p: {
		src: [
			".prebuild/plugins.js"
		],
		dest: js_dist.dist.toString() //output file
	},
	m: {
		src: [
			".prebuild/modules.js"
		],
		dest: js_dist.dist.toString() //output file
	},
	c: {
		src: [
			".prebuild/custom.js"
		],
		dest: js_dist.dist.toString() //output file
	},
	p_c: {
		src: [
			".prebuild/plugins.js",
			".prebuild/custom.js"
		],
		dest: js_dist.dist.toString() //output file
	},
	m_c: {
		src: [
			".prebuild/custom.js",
			".prebuild/modules.js"			
		],
		dest: js_dist.dist.toString() //output file
	},
	p_m: {
		src: [
			".prebuild/plugins.js",
			".prebuild/modules.js",
		],
		dest: js_dist.dist.toString() //output file
	},
	p_m_c: {
		src: [
			".prebuild/plugins.js",
			".prebuild/custom.js",
			".prebuild/modules.js"
		],
		dest: js_dist.dist.toString() //output file
	},
	cs: {
		src: [		
			".prebuild/custom.css",
			".prebuild/mobile.css"
		],
		dest: css_dist.dist.toString() //output file
	},
	sa: {
		src: [
			".prebuild/compiled-sass-custom.css",			
			".prebuild/compiled-sass-mobile.css",
		],
		dest: css_dist.dist.toString() //output file
	},
	cs_sa: {
		src: [
			".prebuild/compiled-sass-custom.css",			
			".prebuild/custom.css",
			".prebuild/compiled-sass-mobile.css",
			".prebuild/mobile.css"
		],
		dest: css_dist.dist.toString() //output file
	}
};