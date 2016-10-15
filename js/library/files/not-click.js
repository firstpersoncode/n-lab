/* =========================================================================
	NOT CLICK

	How to use

	  $('.element').notClick(function(){
		
		and do stuff ...

	  });

	  with timeout set

	    $('.element').notClick( 500, function(){
	  	
	  	after 500 miliseconds and do stuff ...

	    });
	    
========================================================================= */
	$.fn.notClick = function(opt, handler){
		return this.each(function (){
			if (typeof opt == "undefined"){opt = 1}
			$(this).addClass("ss-not-clicked");			
			var _this = this; 
			$(document).mouseup(function (e){
				
	            if (!$(_this).is(e.target) && $(_this).has(e.target).length === 0){
	             	setTimeout(function(){
	             		handler.call(_this);
	             	}, opt);	             	                                 
	            }
            });						
		});
	};