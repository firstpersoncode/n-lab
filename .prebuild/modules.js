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
