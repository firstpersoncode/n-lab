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