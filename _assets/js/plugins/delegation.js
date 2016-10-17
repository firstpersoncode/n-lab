/* =========================================================================
	DELEGATION

	Modified DOM that loaded via AJAX with time out

	How to use

	  Invoke plugin on closest container for the best performance

	  $('#container').delegation(500, function(){
		var newDOM = $(".loaded-dom");
		and do stuff ...

	  });

	  Loading element will be append into image's container (its parent).
========================================================================= */

	$.fn.delegation = function(opt, handler, callback){
		return this.each(function(){
			if(typeof opt == "undefined"){opt = 500}
			else if(isNaN(opt)){
				console.error("First param should be number for setting time out.");
				return false;
			}

			var _this = this;

			if(handler === "subtree"){
				var init = false;				
				$(this).on("DOMSubtreeModified",function(){
				  if (!init) {    		
				        setTimeout(function() {
				            callback.call(_this);    		             
				        }, opt);    		    
				    init = true;
				  }
				});
			}else{
				$(this).on('DOMNodeInserted', function(e) {
				    if ($(e.target).is(handler)) {
				       setTimeout(function() {
				           callback.call(_this);    		             
				       }, opt); 
				    }
				});
			}
			
		});
	};