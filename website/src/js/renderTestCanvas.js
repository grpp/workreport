// Create namespace
window.svgVsCanvas = window.svgVsCanvas || {};

(function() {
	//'use strict';
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
			//canvas.renderAll();
		});
		canvas.renderAll();
		_this.controllers.animationController.animationEnd();
	}

	function updateView(){
		var canvasPropertyObject = {
			left: this.left,
			top: this.top,
			width: this.width,
			height: this.height,
		};

		this.canvasObj.set(canvasPropertyObject);
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