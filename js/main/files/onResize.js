/*==============================================================================================


onResize.js

When screen resized only..


==============================================================================================*/
	onResized: {
		init: function($){
			Main.app.phoneDetect();
			Main.app.offCanvasMenuControl();
			Main.app.greedyCheck();
			Main.onResized.reinitTime();				
		},
		reinitTime: function() {
			//TODO: trigger only refresh
			clearTimeout(reinitTimer);
			reinitTimer = setTimeout(Main.app.slideshowInit, 500);
		}
	},