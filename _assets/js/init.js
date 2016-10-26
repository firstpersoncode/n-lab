var $ = require('jquery'),
	test = require('./test.js');

const Main ={
	init: function($){
		Main.test();
	},
	test : test
};

$(document).ready(function($){
	Main.init($);
});