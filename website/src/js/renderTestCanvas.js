// Create namespace
window.svgVsCanvas = window.svgVsCanvas || {};

(function() {
	'use strict';
	var _this = this;
	var canvas = new fabric.Canvas('c');

	var animationController = window.svgVsCanvas.controllers.animationController;
	var containerController = window.svgVsCanvas.controllers.containerController;
	var objectController = window.svgVsCanvas.controllers.objectController;

	function initialize(){
		containerController.initialize(canvas, objectController);
		
		var animationCallbacks = {
			updateAnimationCallback: updateAnimationCallback,
			setupAnimationCallback: setupAnimationCallback
		};

		animationController.initialize(animationCallbacks);
	}

	function updateAnimationCallback(){
		var allObjects = objectController.getAllObjects();
		allObjects.forEach(function(object){
			object.updateView();
			canvas.renderAll();
		});

		_this.controllers.animationController.stopAnimation();
	}

	function updateView(){
		var canvasPropertyObject = {
			left: _this.left,
			top: _this.top,
			width: _this.width,
			height: _this.height,
		};

		_this.canvasObj.set(canvasPropertyObject);
	}

	function setupAnimationCallback(){
		containerController.deleteAllObjects();
		containerController.addRowsAndColumns(20,20);
		containerController.createAllCanvasObjects();
		var allObjects = objectController.getAllObjects();
		allObjects.forEach(function(object){
			object.updateView = updateView; 
		});
	}

	initialize();

	$('#start').on('click', this.controllers.animationController.animationStart);
	$('#stop').on('click', this.controllers.animationController.animationEnd);



}).apply(window.svgVsCanvas);