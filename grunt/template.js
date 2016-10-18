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
modulesHead = `(function(){
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
`;

module.exports = {
	modulesBanner : {
		head : modulesHead,
		footer : modulesFooter
	},
	pluginsBanner : {
		head : pluginsHead,
		footer : pluginsFooter
	}
};