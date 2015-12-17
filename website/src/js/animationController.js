window.svgVsCanvas = window.svgVsCanvas || {};
window.svgVsCanvas.controllers = window.svgVsCanvas.controllers || {};

(function(){
	'use strict';

	// Setup
	// callback
	var animationId;

	var setupAnimationCallback;
	var endAnimationCallback;
	var beforeUpdateAnimationCallback;
	var afterUpdateAnimationCallback;
	var updateAnimationCallback;

	// Before animation starts
	function animationStart(){
		if(setupAnimationCallback)
			setupAnimationCallback();

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

		if (afterUpdateAnimationCallback)
			afterUpdateAnimationCallback();
	}	

	// Maybe to use for dependency injection
	function initialize(animationCallbacksObj){
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