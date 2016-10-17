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
	};

}(jQuery));

/*==============================================================================================
modules.js
==============================================================================================*/
(function(){
var reinitTimer;
var Module = {		
	init : function($){

		//run here :
		Module.app.init($); //core
		Module.prototype.init($); //test
	},
/*==============================================================================================


app.js

Core properties for SS theme..


==============================================================================================*/
	
	app: {
		homeURL: app_vars.homeURL,
		themeURL: app_vars.themeURL,
		siteName: app_vars.siteName,
		greedyMenu: false,
		offCanvas: true,
		offCanvasMenu: '#navbar .menu',
		offCanvasDirectionFrom: 'right',
		isPhone: false,
		greedyCheck: function() {},
		init: function($) {
		    // Size things
		    Module.app.mobileNavbarOpenOnClick();
		    Module.app.greedySubmenuReveal();
		    Module.app.phoneDetect();
		    //Module.app.removeEmptyParagraph();
		    Module.app.onTopDetect();
		    Module.app.backToTopAnimation();
		    Module.app.offCanvasInit();
		    Module.app.greedyNavInit($);
		    Module.app.greedyNavButtonInit();
		    Module.app.offCanvasTrigger();
		    Module.app.offCanvasMenuControl();
		    Module.app.scrollToContent();
		    Module.app.slideshowInit();
		    Module.app.wrapImageBlock();
		    Module.app.addAttributeToButton();
		    Module.app.handleMobileNav();
		    Module.app.floatHeader();
		},
		mobileNavbarOpenOnClick: function() {
		    if (jQuery('body').hasClass('is-mobile')) {
		        Module.navbarOpenOnClick = true;
		    }
		},
		handleMobileNav: function() {
		  if (Module.app.isPhone === true) {
		    // jQuery('.sub-menu').hide();
		  }

		  jQuery(document).on('click', '#offcanvas .menu-item-has-children > a', function(){
		        if(!jQuery(this).parent().hasClass('opened')) {
		            jQuery(this).parent().addClass('opened');
		            return false;
		        } else {
		            jQuery(this).parent().removeClass('opened');
		        }
		  });
		},
		floatHeader: function() {
		    /*
		     * Desc: trigger floating header when page scrolled down
		     */

		    jQuery(window).scroll(function() {
		        var top = jQuery(document).scrollTop();
		        if (top > 0) {
		            jQuery('body').addClass('sticky-header-on').removeClass('sticky-header-off');
		        } else {
		            jQuery('body').addClass('sticky-header-off').removeClass('sticky-header-on');
		        }
		    });
		},
		addAttributeToButton: function() {
		    jQuery('.btn').each(function() {
		        var text = jQuery(this).text();
		        jQuery(this).attr('data-text', text);
		    });

		    // Add attr to H2
		    jQuery('.ss-text-block .ss-parts-single-part > a > h2').each(function() {
		        var text = jQuery(this).text();
		        jQuery(this).attr('data-hover', text);
		        jQuery(this).parent().attr('data-hover', text);
		    });
		},
		wrapImageBlock: function() {
		    jQuery('.ss-image-block .ss-parts-single-part').each(function() {
		        jQuery(this).find('> h2, > p').wrapAll('<div class="ss-caption-wrapper" />');
		        jQuery(this).find('.ss-parts-image, .ss-caption-wrapper, > a').wrapAll('<div class="ss-parts-single-wrapper" />');
		    });
		},
		slideshowInit: function() {
		    if (!jQuery('.ss-slideshow').length) {
		        return false;
		    }

		    var $slideshow = jQuery('.ss-slideshow');
		    var $slideNext = $slideshow.find('.ss-right');
		    var $slidePrev = $slideshow.find('.ss-left');

		    //destroy all
		    $slideshow.cycle('destroy');

		    //restore background image
		    jQuery('.ss-slide').each(function() {
		        var backgroundImage = jQuery(this).data("backgroundImage");
		        jQuery(this).css('background-image', 'url(' + backgroundImage + ')');
		    });

		    //set visible items based on window width
		    var width = jQuery(window).width();
		    $slideshow.each(function() {
		        var visibleItems;
		        if (width >= 992) { //desktop
		            visibleItems = jQuery(this).data("cycleCarouselVisibleDesktop");
		        } else if (width >= 768) { //tablet
		            visibleItems = jQuery(this).data("cycleCarouselVisibleTablet");
		        } else { //mobile
		            visibleItems = jQuery(this).data("cycleCarouselVisibleMobile");
		        }
		        jQuery(this).data("cycleCarouselVisible", visibleItems);
		    });

		    function getCycleData(id) {
		        var slideClass = '.ss-slideshow .ss-slide';
		        var result = false;

		        jQuery(slideClass).not('.cycle-sentinel').each(function(i){
		            if(i == id) {
		                var image = jQuery(this).data('background-image');
		                var title = jQuery(this).find('.ss-slide-caption h3').text();
		                var caption = jQuery(this).find('.ss-slide-caption .ss-slide-content').text();

		                result = {
		                    image: image,
		                    title: title,
		                    caption: caption
		                };
		            }
		        });
		        return result;
		    }

		    function getPrevID(currentID, totalID) {
		        var prevID;
		        if(currentID <= 0) {
		            prevID = (totalID - 1);
		        } else {
		            prevID = (currentID - 1);
		        }
		        return prevID;
		    }

		    function renderHTML(image, title, caption, elm) {
		        var HTML = "<div class='nav-text'><h3>"+title+" <span>"+caption+"</span></h3><div class='nav-bg-image' style='background-image: url("+image+")'></div></div>";
		        elm.html(HTML);
		    }

		    // On analized
		    $slideshow.on('cycle-update-view', function(event, optionHash) {

		        var prevSlide = getCycleData(getPrevID(optionHash.currSlide, optionHash.slideCount));
		        var nextSlide = getCycleData(optionHash.nextSlide);

		        if(jQuery('.ss-slideshow').hasClass('ss-parts-carousel')) {
		            nextSlide = getCycleData(optionHash.nextSlide + 1);
		        }

		        renderHTML(prevSlide.image, prevSlide.title, prevSlide.caption, $slidePrev);
		        renderHTML(nextSlide.image, nextSlide.title, nextSlide.caption, $slideNext);
		    });

		    // init default setting for slider
		    $slideshow.cycle({
		        manualSpeed: 500,
		        slides: '.ss-slide',
		        pagerTemplate: '<span></span>'
		    });
		},
		removeEmptyParagraph: function() {
		    jQuery('p').each(function() {
		        var $this = jQuery(this);
		        if ($this.html().replace(/\s|&nbsp;/g, '').length == 0)
		            $this.remove();
		    });
		},
		offCanvasInit: function() {
		    if (!Module.offCanvas || !jQuery(Module.app.offCanvasMenu).length) {
		        return false;
		    }

		    var offCanvasButtonHTML = "<span class='offcanvas-hamburger'></span>";
		    jQuery(offCanvasButtonHTML).insertAfter(Module.app.offCanvasMenu);

		    var $offCanvasHTML = jQuery(Module.app.offCanvasMenu)[0].outerHTML;
		    $offCanvasHTML = '<div id="offcanvas" class="' + Module.app.offCanvasDirectionFrom + '"><span class="close-btn"></span>' + $offCanvasHTML + '</div><div class="overlay"></div>';
		    jQuery($offCanvasHTML).insertBefore('#footer');

		    // Add class
		    jQuery(Module.app.offCanvasMenu).parent().addClass('offcanvas-menu');
		    jQuery('body').addClass('offcanvas-active');
		},
		offCanvasTrigger: function() {
		    jQuery('.offcanvas-hamburger').on('click', function() {
		        if (!jQuery('body').hasClass('offcanvas-opened')) {
		            jQuery('body').addClass('offcanvas-opened')
		        }
		    });

		    jQuery('#offcanvas .close-btn, .offcanvas-opened .overlay').on('click', function() {
		        if (jQuery('body').hasClass('offcanvas-opened')) {
		            jQuery('body').removeClass('offcanvas-opened')
		        }
		    });
		},
		offCanvasMenuControl: function() {
		    if (!Module.app.isPhone) {
		        jQuery('body').removeClass('offcanvas-opened')
		    }
		},
		phoneDetect: function() {
		    if (jQuery('#phone-detection').css('display') == 'none') {
		        Module.app.isPhone = true;
		    } else {
		        Module.app.isPhone = false;
		    }
		},
		onTopDetect: function() {
		    jQuery(window).scroll(function() {
		        var top = jQuery(document).scrollTop();
		        if (top > 0) {
		            jQuery('body').addClass('not-on-top');
		        } else {
		            jQuery('body').removeClass('not-on-top');
		        }
		    });
		},
		backToTopAnimation: function() {
		    var button = "#back-to-top";
		    jQuery(button).click(function(event) {
		        event.preventDefault();
		        jQuery('html,body').animate({
		            scrollTop: 0
		        }, 500);
		    });
		},
		scrollToContent: function() {
		    var button = ".top-hero .ss-part-button";
		    var offset = 90;
		    var speed = 1000;

		    jQuery(button).click(function(event) {
		        event.preventDefault();

		        var height = jQuery(window).height();
		        jQuery('html,body').animate({
		            scrollTop: height - offset
		        }, speed);
		    });
		},
		greedyNavButtonInit: function() {
		    if (!Module.app.greedyMenu) {
		        return false;
		    }

		    jQuery("<span class='greedy-trigger'>More<ul class='hidden-links hidden'></ul></span>").insertAfter('#navbar .menu');
		    jQuery('#navbar .menu').parent().addClass('greedy');
		    jQuery(document).trigger('greedyNavReady');
		},
		greedyNavInit: function($) {
		    if (!Module.app.greedyMenu) {
		        return false;
		    }

		    jQuery(document).on('greedyNavReady', function() {

		        var $nav = $('.greedy');
		        var $btn = $('.greedy .greedy-trigger');
		        var $vlinks = $('.greedy .menu');
		        var $hlinks = $('.greedy .hidden-links');

		        var numOfItems = 0;
		        var totalSpace = 0;
		        var breakWidths = [];

		        // Get initial state
		        $vlinks.children().outerWidth(function(i, w) {
		            totalSpace += w;
		            numOfItems += 1;
		            breakWidths.push(totalSpace);
		        });

		        var availableSpace, numOfVisibleItems, requiredSpace;

		        Module.app.greedyCheck = function() {

		            // Get instant state
		            availableSpace = $vlinks.width() - 10;
		            numOfVisibleItems = $vlinks.children().length;
		            requiredSpace = breakWidths[numOfVisibleItems - 1];

		            // There is not enought space
		            if (requiredSpace > availableSpace) {
		                $vlinks.children().last().prependTo($hlinks);
		                numOfVisibleItems -= 1;
		                Module.app.greedyCheck();

		                // There is more than enough space
		            } else if (availableSpace > breakWidths[numOfVisibleItems]) {
		                $hlinks.children().first().appendTo($vlinks);
		                numOfVisibleItems += 1;
		            }
		            // Update the button accordingly
		            $btn.attr("count", numOfItems - numOfVisibleItems);
		            if (numOfVisibleItems === numOfItems) {
		                $btn.addClass('hidden');
		                jQuery('body').removeClass('greedy-menu-active');
		            } else {
		                $btn.removeClass('hidden');
		                jQuery('body').addClass('greedy-menu-active');
		            }
		        }

		        if (Module.navbarSubMenuTrigger == "click") {
		            $btn.on('click', function() {
		                jQuery('.menu-item').removeClass('opened');
		                $hlinks.toggleClass('hidden');
		            });
		        } else {
		            $btn.hover(function() {
		                jQuery('.menu-item').removeClass('opened');
		                $hlinks.removeClass('hidden');
		            }, function() {
		                $hlinks.addClass('hidden');
		            });
		        }

		        Module.app.greedyCheck();
		    });
		},
		greedySubmenuReveal: function() {
		    jQuery(document).on('click', '.hidden-links .menu-item-has-children', function() {
		        if (!jQuery(this).hasClass('children-opened')) {
		            jQuery(this).addClass('children-opened')
		        } else {
		            jQuery(this).removeClass('children-opened')
		        }
		    });
		}
	},
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
/*==============================================================================================


onLoad.js

When page loaded only..


==============================================================================================*/
	onLoaded: {
		init: function($){
			Module.onLoaded.test_1();
		},
		test_1: function(){
			console.log("load");
		}
	},
/*==============================================================================================


prototype.js

Developing and testing goes here..


==============================================================================================*/
	prototype: {
		init: function($){
			Module.prototype.test_1();
		},
		test_1 : function(){
			console.log("Working");
		}		
	},
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

/*==============================================================================================
custom.js
==============================================================================================*/
