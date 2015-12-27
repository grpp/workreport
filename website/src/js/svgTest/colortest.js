// Create namespace
window.svgVsCanvas = window.svgVsCanvas || {};

(function() {
	//'use strict';
	//var _this = this;

	var animationController = window.svgVsCanvas.controllers.animationController;
	var containerController = window.svgVsCanvas.controllers.containerController;
	var objectController = window.svgVsCanvas.controllers.objectController;

	var x = 0;
	var y = 0;
	var maxX;
	var maxY;
	var svg = window.Snap('#svgWrapper');

	function initialize(){

		containerController.initialize(null, svg, objectController);
		
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

	function updateView(color){
		var propertyObject = {
			x: this.left,
			y: this.top,
			width: this.width,
			height: this.height,
		};

		if (color){
			this.color = color;
		} else {
			this.randomizeColor();
		}

		propertyObject.fill = this.color;

		var object = svg.select('#' + this.guid);
		object.attr(propertyObject);
	}

	function endAnimationCallback(){
		containerController.deleteAllObjects();
		containerController.resetSize();
		x = 0;
		y = 0;
	}

	function setupAnimationCallback(){
		containerController.addRowsAndColumns(100,100);
		containerController.createAllSVGObjects();
		var allObjects = objectController.getAllObjects();
		allObjects.forEach(function(object){
			object.updateView = updateView; 
			object.updateView('black');
		});
		maxX = containerController.getRowSize() - 1;
		maxY = containerController.getColumnSize() - 1;
	}

	initialize();

	$('#start').on('click', this.controllers.animationController.animationStart);
	$('#stop').on('click', this.controllers.animationController.animationEnd);



}).apply(window.svgVsCanvas);