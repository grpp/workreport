window.svgVsCanvas = window.svgVsCanvas || {};
window.svgVsCanvas.controllers = window.svgVsCanvas.controllers || {};

(function(){
	'use strict';

	var fpsCounter = 0;

	// Setup
	// callback
	var animationId;

	var setupAnimationCallback;
	var endAnimationCallback;
	var beforeUpdateAnimationCallback;
	var afterUpdateAnimationCallback;
	var updateAnimationCallback;

	var lastCalledTime;
	var fps;
	// Before animation starts
	function animationStart(){
		if(setupAnimationCallback)
			setupAnimationCallback();

		lastCalledTime = Date.now();
		fps = 0;
		animationId = requestAnimationFrame(updateAnimationCallback);
	}

	function animationEnd(endCallback){
		cancelAnimationFrame(animationId);

		if(endAnimationCallback)
			endAnimationCallback();
	}

	function animationFrameUpdate(animationCallback, beforeCallback, afterCallback){
		if (beforeUpdateAnimationCallback)
			beforeUpdateAnimationCallback();

		animationId = requestAnimationFrame(updateAnimationCallback);

		var delta = (new Date().getTime() - lastCalledTime)/1000;
		lastCalledTime = Date.now();
		fps = 1/delta;
		fpsCounter.text(fps);

		if (afterUpdateAnimationCallback)
			afterUpdateAnimationCallback();
	}	

	// Maybe to use for dependency injection
	function initialize(animationCallbacksObj){
		fpsCounter = $('#fps');
		setupAnimationCallback = animationCallbacksObj.setupAnimationCallback;
		endAnimationCallback = animationCallbacksObj.endAnimationCallback;
		beforeUpdateAnimationCallback = animationCallbacksObj.beforeUpdateAnimationCallback;
		afterUpdateAnimationCallback = animationCallbacksObj.afterUpdateAnimationCallback;
		updateAnimationCallback = animationCallbacksObj.updateAnimationCallback;
	}

	this.animationController = {
		animationStart: animationStart,
		animationEnd: animationEnd,
		animationFrameUpdate: animationFrameUpdate,

		initialize: initialize,
	};

}).apply(window.svgVsCanvas.controllers);