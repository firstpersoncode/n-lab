/* =========================================================================
	IMG TO BG

	Modified div to have background img based on img
	
	How to use
		
		// give '.container-img' some background-image : 
		$('.container-img').imgToBg('img.some-image');

		// with target container : 
		$('.container-img').imgToBg('img.some-image', '.put-bg-here');

		// accept callback : 
		$('.container-img').imgToBg('img.some-image', null, function(){ // pass 'null' if no target was given
			
			//do whatever you want..

		});

========================================================================= */

	$.fn.imgToBg = function(el, target, handler){
		return this.each(function(){
			var bg = $(el).attr('src');

			if(target != undefined){
				$(target)
					.css('background-image', 'url('+bg+')');
			}else{
				$(this)
					.css('background-image', 'url('+bg+')');
			}

			if(handler != undefined && typeof handler == "function"){
				
				handler.call(this);
			}
		});
	};