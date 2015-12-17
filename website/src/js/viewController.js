window.svgVsCanvas = window.svgVsCanvas || {};
window.svgVsCanvas.controllers = window.svgVsCanvas.controllers || {};

(function(){
	'use strict';

	var objectController; 
	var startHandler;
	var stopHandler;
	var startButton = $('start');
	var stopButton = $('stop');

	var renderType = Object.freeze({
		SVG: 'svg',
		CANVAS: 'canvas',
	});
		
	function updateView(wrapperObj){
		if (wrapperObj.type === renderType.SVG){
			objectController.updateView();
		} else if (wrapperObj.type === renderType.CANVAS){
			objectController.updateView();
		}
	}

	function buttonHandlers(start, stop){
		startHandler = start;
		stopHandler = stop;
		startButton.on('click', startHandler);
		stopButton.on('click', stopHandler);
	}

	function unbindHandlers(){
		startButton.off('click', startHandler);
		stopButton.off('click', stopHandler);
	}

	// Maybe to use for dependency injection
	function initialize(objectControl){
		objectController = objectControl;
	}

	this.controllers.viewController = {
		initialize: initialize,
		updateView: updateView,
		buttonHandlers: buttonHandlers,
		unbindHandlers: unbindHandlers,
		renderType: renderType,
	};

}).apply(window.svgVsCanvas);