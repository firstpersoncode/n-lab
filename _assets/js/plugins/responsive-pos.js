	// $.fn.responsivePosition = function(option){
	// 	var settings = $.extend({
	// 		offsetTarget: null,
	// 		onDesktop: 400,
	// 		onMobile: 200,
	// 		elCloseToBot: {},
	// 		elCloseToTop: {},
	// 		elOnStick: {},
	// 		stickySearch: null,
	// 		targetSticky: null
	// 	}, option);

					

	// 	return this.each(function(){			
	// 		if(settings.targetSticky){
	// 			var sticky_target = settings.targetSticky;
	// 		}

	// 		var desktop = settings.offsetTarget.offset().top > (jQuery(window).scrollTop() + jQuery(window).height() - settings.onDesktop),					
	// 			mobile = settings.offsetTarget.offset().top > (jQuery(window).scrollTop() + jQuery(window).height() - settings.onMobile);

	// 		if(jQuery('body').hasClass('is-mobile')){
	// 			if(mobile){	
	// 				settings.elTarget.css(settings.elCloseToBot);
	// 			}else{
	// 				settings.elTarget.css(settings.elCloseToTop);							
	// 				if(settings.stickySearch == true){
	// 					if(sticky_target){settings.elTarget.css(settings.elOnStick)}
	// 					else{settings.elTarget.css(settings.elCloseToTop);}
	// 				}							
	// 			}						
	// 		}else{
	// 			if(desktop){
	// 				settings.elTarget.css(settings.elCloseToBot);
	// 			}else{
	// 				settings.elTarget.css(settings.elCloseToTop);				
	// 				if(settings.stickySearch == true){
	// 					if(sticky_target){settings.elTarget.css(settings.elOnStick)}
	// 					else{settings.elTarget.css(settings.elCloseToTop);}
	// 				}							
	// 			}
	// 		}
	// 	});
	// }; 