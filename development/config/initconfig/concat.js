/*
==========================================================================================

CONCAT

==========================================================================================
*/			
		concat: { //concatenated small chunks of files into one file
/*
==========================================================================================
js
==========================================================================================
*/
			modules: {
				options: {
					banner: modulesHead,
					footer: modulesFooter

				},
				src: modules_list.getFiles(),
				dest: ".dist/modules.js" //output file
			},
			plugins: {
				options: {
					banner: pluginsHead,
					footer: pluginsFooter
				},
				src: plugins_list.getFiles(),
				dest: ".dist/plugins.js" //output file
			},
/*
==========================================================================================
css
==========================================================================================
*/
			css_custom: {
				src: css_cust_list.getFiles(),
				dest: ".dist/custom.css" //output file
			},
			css_mobile: {
				src: css_mobi_list.getFiles(),
				dest: ".dist/mobile.css" //output file
			},
		},