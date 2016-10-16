(function($, window, undefined){
	'use strict';
/* =========================================================================
  AUTO SCROLL
  
  Invoke the plugin to the parent navigation
  $('#navbar').autoScroll();

  setting : default

  $('#navbar').autoScroll({
	speed 		: 600,	||	scroll speed default '600' or 600ms (data type = number)
	offset 		: 0,	||	offset position '10' will push offset 10px from its offset, '- 10' will pull offset 10px from its offset (data type = number)
  }, function(){

	accept callback..

  });

  Add attribute "data-scroll" inside <a> tag.
  And its value must be the id name of the destination element.

    - Example : <a data-scroll="download" href="http://download.com">Download</a>
    - Its destination will be <div id="download"></div>
========================================================================= */
	$.fn.autoScroll = function(opt, callback){
	  //default setting
	  var settings = $.extend({
	    speed : 600,//scroll speed
	    offset : 0,//offset position '10' will push offset 10px from its offset, '- 10' will pull offset 10px from its offset
	  }, opt);

	  return this.each(function(){
	  	var _this = this;
	  	//autoscroll handler
	    $(this)
	    	.addClass("ss-auto-scroll")
		    .find('a[data-scroll]').on('click',function (e){
		      e.preventDefault();
		      var scrollTo = $(this).attr('data-scroll');
		      var destination = $('#'+scrollTo);
		      $('html, body').animate({
		          scrollTop : destination.offset().top + settings.offset
		        }, settings.speed, function(){
		          if (typeof callback != "undefined" && $.isFunction( callback ) ) {//callback when the element is loaded
		            callback.call(_this);
		          }
		        });//end callback after reach the destination
		    });
	  });
	};
/* =========================================================================
	
	TOGGLE HIDE SHOW NAVBAR
		
  Invoke plugin
  $('#navbar').toggleNav({
	  slideEffect : true, // Toggle effect, (boolean). Only accept true or false.
      speed : 300 // Toggle animation speed (number) limit of speed is 5000.
  });

  the navbar will be positioned 'fixed' and stick on the top of screen with full width.

  
========================================================================= */

	$.fn.toggleNav = function(opt, callback1, callback2){
	  //default setting
	  var settings = $.extend({
	    //Only one effect can be set, if two effects are true, the plugin will throw error
	    fadeEffect : null, // Toggle fadeIn fadeOut effect
	    slideEffect : null, // Toggle slide to top effect
	    speed : 600 // Toggle animation speed
	  }, opt);

	  var slideTrue = settings.slideEffect == true,
	        fadeTrue = settings.fadeEffect == true;    

	  return this.each(function(){
	    //check all the settings are good to go !
	    if(slideTrue&&fadeTrue){
	      console.error('error, Can\'t set two effects at the same time');
	      return false
	    }else if(!slideTrue&&!fadeTrue){
	      console.error('error, no effect is running');
	      return false
	    }
	    if(settings.speed > 5000 || isNaN(settings.speed)){
	      console.error('error, the speed setting is not correct');
	      return false
	    }
	    
	    //handle the navbar
	    $(this).addClass("ss-toggle-nav");
	    var _this = this,
	    	togglethis = $('.ss-toggle-nav'),
	        previousScroll = 0,//record last scroll
	        headerHeight = togglethis.outerHeight();//record 'this' height

	    togglethis.css({//default styling for navbar
	      position : 'fixed',
	      top : '0',left : '0',
	      width : '100%',
	      display : 'block',
	      'z-index' : 99998
	    });

	    if(slideTrue){//if slide effect, then 'this' needs transition.                
	      togglethis.css({
	        WebkitTransition  : 'ease-out '+settings.speed/1000+'s',
	        MozTransition     : 'ease-out '+settings.speed/1000+'s',
	        MsTransition      : 'ease-out '+settings.speed/1000+'s',
	        OTransition       : 'ease-out '+settings.speed/1000+'s',
	        transition        : 'ease-out '+settings.speed/1000+'s'
	      });
	    }

	    function hideNav(){//handle toggle hide navbar
	      if(fadeTrue){togglethis.fadeOut(settings.speed)}
	      else if(slideTrue){          
	        togglethis.css({
	          'transform' : 'translateY(-'+headerHeight+'px)'
	        });
	      }
	      if (typeof callback1 != "undefined" && $.isFunction( callback1 ) ) {
	      	callback1.call(_this);
	      }	      
	    }
	    function showNav(){//handle toggle show navbar
	      if(fadeTrue){togglethis.fadeIn(settings.speed)}
	      else if(slideTrue){          
	        togglethis.css({
	          'transform' : 'translateY(0px)'
	        });
	      }
	      if (typeof callback2 != "undefined" && $.isFunction( callback2 ) ) {
  	      	callback2.call(_this);
  	      }	
	    }

	    //toggle navbar
	    $(window).scroll(function(){
	      var currentScroll = $(this).scrollTop();        
	        if (currentScroll > previousScroll) {//check if page scrolled to bottom
	            hideNav();
	        } else { //check if page scrolled to top
	            showNav();
	        }
	      previousScroll = currentScroll;
	    });
	  });
	};
/* =========================================================================
	HOVER EFFECT DIRECTION
	
	How to use

	$('#da-thumbs > li').hoverdir();
	// or with options
	$('#da-thumbs > li').hoverdir({hoverDelay: 75, hoverElem: '.elem'});
	Default options

	defaults: {
	    speed: 300, // Times in ms
	    easing: 'ease',
	    hoverDelay: 0, // Times in ms
	    inverse: false,
	    hoverElem: 'div'
	}
========================================================================= */
	$.HoverDir = function( options, element ) {        
	    this.$el = $( element );
	    this._init( options );
	};
	// the options
	$.HoverDir.defaults = {
	    speed : 300,
	    easing : 'ease',
	    hoverDelay : 0,
	    inverse : false
	};
	$.HoverDir.prototype = {
	    _init : function( options ) {            
	        // options
	        this.options = $.extend( true, {}, $.HoverDir.defaults, options );
	        // transition properties
	        this.transitionProp = 'all ' + this.options.speed + 'ms ' + this.options.easing;
	        // support for CSS transitions
	        this.support = Modernizr.csstransitions;
	        // load the events
	        this._loadEvents();
	    },
	    _loadEvents : function() {
	        var self = this;            
	        this.$el.on( 'mouseenter.hoverdir, mouseleave.hoverdir', function( event ) {                
	            var $el = $( this ),
	                $hoverElem = $el.find( 'div' ),
	                direction = self._getDir( $el, { x : event.pageX, y : event.pageY } ),
	                styleCSS = self._getStyle( direction );                
	            if( event.type === 'mouseenter' ) {                    
	                $hoverElem.hide().css( styleCSS.from );
	                clearTimeout( self.tmhover );
	                self.tmhover = setTimeout( function() {                        
	                    $hoverElem.show( 0, function() {                            
	                        var $el = $( this );
	                        if( self.support ) {
	                            $el.css( 'transition', self.transitionProp );
	                        }
	                        self._applyAnimation( $el, styleCSS.to, self.options.speed );
	                    });  
	                }, self.options.hoverDelay );                    
	            }
	            else {                
	                if( self.support ) {
	                    $hoverElem.css( 'transition', self.transitionProp );
	                }
	                clearTimeout( self.tmhover );
	                self._applyAnimation( $hoverElem, styleCSS.from, self.options.speed );                    
	            }                    
	        });
	    },
	    _getDir : function( $el, coordinates ) {            
	        // the width and height of the current div
	        var w = $el.width(),
	            h = $el.height(),
	            // calculate the x and y to get an angle to the center of the div from that x and y.
	            // gets the x value relative to the center of the DIV and "normalize" it
	            x = ( coordinates.x - $el.offset().left - ( w/2 )) * ( w > h ? ( h/w ) : 1 ),
	            y = ( coordinates.y - $el.offset().top  - ( h/2 )) * ( h > w ? ( w/h ) : 1 ),            
	            // the angle and the direction from where the mouse came in/went out clockwise (TRBL=0123);
	            // first calculate the angle of the point,
	            // add 180 deg to get rid of the negative values
	            // divide by 90 to get the quadrant
	            // add 3 and do a modulo by 4  to shift the quadrants to a proper clockwise TRBL (top/right/bottom/left) **/
	            direction = Math.round( ( ( ( Math.atan2(y, x) * (180 / Math.PI) ) + 180 ) / 90 ) + 3 ) % 4;            
	        return direction;            
	    },
	    _getStyle : function( direction ) {            
	        var fromStyle, toStyle,
	            slideFromTop = { left : '0px', top : '-100%' },
	            slideFromBottom = { left : '0px', top : '100%' },
	            slideFromLeft = { left : '-100%', top : '0px' },
	            slideFromRight = { left : '100%', top : '0px' },
	            slideTop = { top : '0px' },
	            slideLeft = { left : '0px' };            
	        switch( direction ) {
	            case 0:
	                // from top
	                fromStyle = !this.options.inverse ? slideFromTop : slideFromBottom;
	                toStyle = slideTop;
	                break;
	            case 1:
	                // from right
	                fromStyle = !this.options.inverse ? slideFromRight : slideFromLeft;
	                toStyle = slideLeft;
	                break;
	            case 2:
	                // from bottom
	                fromStyle = !this.options.inverse ? slideFromBottom : slideFromTop;
	                toStyle = slideTop;
	                break;
	            case 3:
	                // from left
	                fromStyle = !this.options.inverse ? slideFromLeft : slideFromRight;
	                toStyle = slideLeft;
	                break;
	        };            
	        return { from : fromStyle, to : toStyle };                    
	    },
	    // apply a transition or fallback to jquery animate based on Modernizr.csstransitions support
	    _applyAnimation : function( el, styleCSS, speed ) {
	        $.fn.applyStyle = this.support ? $.fn.css : $.fn.animate;
	        el.stop().applyStyle( styleCSS, $.extend( true, [], { duration : speed + 'ms' } ) );
	    },
	};

	var logError = function( message ) {
	    if ( window.console ) {
	        window.console.error( message );        
	    }
	};    
	$.fn.hoverdir = function( options ) {
	    var instance = $.data( this, 'hoverdir' );        
	    if ( typeof options === 'string' ) {            
	        var args = Array.prototype.slice.call( arguments, 1 );            
	        this.each(function() {            
	            if ( !instance ) {
	                logError( "cannot call methods on hoverdir prior to initialization; " +
	                "attempted to call method '" + options + "'" );
	                return;                
	            }                
	            if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
	                logError( "no such method '" + options + "' for hoverdir instance" );
	                return;                
	            }                
	            instance[ options ].apply( instance, args );            
	        });        
	    } 
	    else {        
	        this.each(function() {                
	            if ( instance ) {
	                instance._init();                
	            }
	            else {
	                instance = $.data( this, 'hoverdir', new $.HoverDir( options, this ) );                
	            }
	        });        
	    }        
	    return instance;        
	};
/* =========================================================================
	LOADING EFFECT

	How to use

	Invoke plugin

	$('img').loadingEffect(
		"<div class='loading'></div>", //loading template
		function(){
		
		//callback after img loaded..

	});

	  Loading element will be append into image's container (its parent).
========================================================================= */
	$.fn.loadingEffect = function(template, callback) {
	    return this.each( function() {
	    	if(typeof template == "undefined"){
	    		template = "<div class='loading'></div>"
	    	}
	    	$(this)
	    		.parent()//loading element will be inside selector's container
	    		.addClass("ss-loading")
	    		.append("<div class='ss-loading-img'>"+template+"</div>");        	        	
	    	//loading handler
	    	$(this).each(function(){
	    		var containerImgs = $(this).parent();//selector's container
	    		containerImgs.css({//prevent the loading element from overflowing
	    			position: 'relative',
	    			overflow: 'hidden'
	    		});	
	    		if(containerImgs.is('a')){//if the container is anchor link
	    			containerImgs.css({	    				
	    				display: 'inline-block'
	    			});
	    		}	
	    		$(this).on('load', function(){//remove loading element
	    			$(this)
	    				.parent()
	    				.find(".ss-loading-img")
	    				.fadeOut(function(){
	    					$(this).remove();  //we need to remove it in real life !
	    				});

	    			if ( typeof callback != "undefined" && $.isFunction( callback ) ) {//callback when the element is loaded
	    				callback.call(this);
	    			}
	    		});
	    	});

	    	$(window).on('load', function(){//force remove loading element when document finish loading
	    		$(".ss-loading-img")
	    			.fadeOut(function(){
	    				$(this).remove();  //we need to remove it in real life !
	    			});
	    	});
	    });
	};
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
	};}(jQuery));
