(function($, window, undefined){
/*==============================================================================================

MAIN

==============================================================================================*/
var reinitTimer;

var Main = {
	
	init : function($){

		//run here :
		Main.app.init($); //core
		Main.prototype.init($); //test
	},