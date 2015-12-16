window.svgVsCanvas = window.svgVsCanvas || {};
window.svgVsCanvas.controllers = window.svgVsCanvas.controllers || {};

(function(){
	'use strict';

	// Setup
	// callback
	var animationId;

	function animationStart(callback){
		animationId = requestAnimationFrame(callback);
	}

	function animationEnd(){
		cancelAnimationFrame(animationId);
	}

	function animationFrameUpdate(callback){

	}

	this.animationController = {
		animationStart: animationStart,
		animationEnd: animationEnd,
		animationFrameUpdate: animationFrameUpdate
	};

}).apply(window.svgVsCanvas.controllers);