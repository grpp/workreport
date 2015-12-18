// Create namespace
window.svgVsCanvas = window.svgVsCanvas || {};

(function() {
	//'use strict';
	var _this = this;
	var canvas = new fabric.StaticCanvas('c', {renderOnAddRemove: false, stateful: false});

	var animationController = window.svgVsCanvas.controllers.animationController;
	var containerController = window.svgVsCanvas.controllers.containerController;
	var objectController = window.svgVsCanvas.controllers.objectController;

	var x = 0;
	var y = 0;
	var maxX;
	var maxY;

	function initialize(){
		containerController.initialize(canvas, objectController);
		
		var animationCallbacks = {
			updateAnimationCallback: updateAnimationCallback,
			setupAnimationCallback: setupAnimationCallback,
			endAnimationCallback: endAnimationCallback,
		};

		animationController.initialize(animationCallbacks);
	}

	function updateAnimationCallback(){
		var currentObj = objectController.getObject(x,y);
		currentObj.updateView();
		canvas.renderAll();

		if(maxX === x && maxY === y)
			animationController.animationEnd();
		else {
			if (x === maxX){
				x = 0;
				y++;
			} else {
				x++;
			}

			animationController.animationFrameUpdate();
		}
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

	function endAnimationCallback(){
		containerController.deleteAllObjects();
		canvas.renderAll();
		containerController.resetSize();
		x = 0;
		y = 0;
	}

	function setupAnimationCallback(){
		containerController.addRowsAndColumns(20,20);
		containerController.createAllCanvasObjects();
		var allObjects = objectController.getAllObjects();
		allObjects.forEach(function(object){
			object.updateView = updateView;
		});

		maxX = containerController.getRowSize() - 1;
		maxY = containerController.getColumnSize() - 1;
	}

	initialize();

	$('#start').on('click', this.controllers.animationController.animationStart);
	$('#stop').on('click', this.controllers.animationController.animationEnd);



}).apply(window.svgVsCanvas);