/* =========================================================================
  PROTOTYPE
  
  how to invoke
  $('#el').protoType();

  setting : default

  $('#el').protoType({
	property : value,	//	description
	property : value,	//	description
  });

  Description

========================================================================= */
	$.fn.protoType = function(opt){
	  //default setting
	  var settings = $.extend({
	    option : 'value'
	  }, opt);
	  return this.each(function(){
	  	// ..
	  });
	};