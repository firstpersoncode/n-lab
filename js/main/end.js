	end: ""//end main.js
};

jQuery(document).ready(function($){
	Main.init($);

	jQuery(window).resize(function($){
	    Main.onResized.init($);
	});

	jQuery(window).on('load', function($){
		Main.onLoaded.init($);
	});
});

})();