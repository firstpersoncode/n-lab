/*
==========================================================================================

TEMPLATE

==========================================================================================
*/


var pluginsHead = `(function($, window, undefined){
'use strict';
`,
pluginsFooter = `

}(jQuery));
`,
modulesHead = `/*==============================================================================================
modules.js
==============================================================================================*/
(function(){
var reinitTimer;
var Module = {		
`,
modulesFooter = `
	end: ""
};

jQuery(document).ready(function($){
Module.init($);

	jQuery(window).resize(function($){
	    Module.onResized.init($);
	});

	jQuery(window).on('load', function($){
		Module.onLoaded.init($);
	});
});

})();
`,
customHead = `/*==============================================================================================
custom.js
==============================================================================================*/
`;

module.exports = {
	modulesBanner : {
		head : modulesHead,
		footer : modulesFooter
	},
	pluginsBanner : {
		head : pluginsHead,
		footer : pluginsFooter
	},
	custom : customHead
};