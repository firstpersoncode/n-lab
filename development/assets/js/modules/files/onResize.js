/*==============================================================================================


onResize.js

When screen resized only..


==============================================================================================*/
	onResized: {
		init: function($){
			Module.app.phoneDetect();
			Module.app.offCanvasMenuControl();
			Module.app.greedyCheck();
			Module.onResized.reinitTime();				
		},
		reinitTime: function() {
			//TODO: trigger only refresh
			clearTimeout(reinitTimer);
			reinitTimer = setTimeout(Module.app.slideshowInit, 500);
		}
	},