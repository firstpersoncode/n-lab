/* =========================================================================
	RESPOND TO

	How to use

	  $('.element').respondTo(767, function(){
		
		screen width < 767px 
		and do stuff ...

	  }, function(){
		
		screen width > 767px
		and do stuff ..

	  });
	    
========================================================================= */
	$.fn.respondTo = function(opt, handler1, handler2){
		return this.each(function(){			
			$(this).addClass("ss-respond");
			var _this = this;

			function init(){
				if($(window).width() < opt){
					handler1.call(_this);
				}else{
					handler2.call(_this);
				}
			}			
			$(document).on("ready",function(){
				init();
			});
			$(window).resize(function(){
				init();
			});						
		});
	};