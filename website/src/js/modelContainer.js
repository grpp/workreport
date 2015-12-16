window.svgVsCanvas = window.svgVsCanvas || {};
window.svgVsCanvas.controllers = window.svgVsCanvas.controllers || {};


/* 
	- High level interaction should go here
	- Should only keep track of container information such as height and width
	- Whenever you need to act on canvas
*/
(function(){
	'use strict';
	var rowSize;
	var colSize;
	var _this = this;
	var currentIndex = 0;
	var currentRow = 0;
	var currentCol = 0;

	// is always just equal to rowSize or colSize minus 1
	var rowLength;
	var colLength;

	// Is the canvas fabrics wrapper of the canvas
	var canvas; 

	// current position doesnt make sense this is for initializing current position
	// only for rendering test
	function getInitialRenderPosition(){
		var animateObject = _this.objectController.getObject(currentIndex);
		var height = animateObject.getHeight();
		var width = animateObject.getWidth();

		// We can either use the canvas size and calculate the height and width
		// or we can use the currentRow and current Height to determine the size
		var top = currentRow * height;
		var left = currentCol * width;

		return {
			top: top,
			left: left,
			height: height,
			width: width,
		};
	}

	function getNumberOfObjects(){
		return rowSize * colSize;
	}

	function getRowSize(){
		return rowSize;
	}

	function getColumnSize(){
		return colSize;
	}

	function addColumns(numOfCols){
		var newListSize;
		var numOfObjectsToAdd;

		colSize += numOfCols;
		colLength = numOfCols - 1;

		newListSize = colSize * rowSize;
		numOfObjectsToAdd = newListSize - getNumberOfObjects();


		for(var i = 0; i < numOfObjectsToAdd; i++){
			createObject();
		}
	}

	function addRows(numOfRows){
		var newListSize;
		var numOfObjectsToAdd;

		rowSize += numOfRows;
		rowLength = numOfRows - 1;

		newListSize = colSize * rowSize;
		numOfObjectsToAdd = newListSize - getNumberOfObjects();

		for(var i = 0; i < numOfObjectsToAdd; i++){
			createObject();
		}
	}

	function addRowsAndColumns(numOfRows, numOfCols){
		addColumns(numOfCols);
		addRows(numOfRows);
	}

	// You can specify specific dimension
	function createCanvasRect(propertyObj){
		var rect = new fabric.Rect();

		if (propertyObj){
			rect.set(propertyObj);
		}

		canvas.add(rect);

		return rect;
	}

	function createObject(){
		var object = _this.controllers.objectController.createObject();
		initializeRectObject(object);
	}

	function deleteAllObjects(){
		// remove from canvas
		var listOfObjects = _this.controllers.objectController.getObjects();
		listOfObjects.forEach(function deleteModelObject(object){
			var canvasObject = object.canvasObject;
			if (canvasObject){
				canvas.remove(canvasObject);
			}
		});

		_this.controllers.objectController.deleteAllObjects();
	}

	function initializeRectObject(obj){
		var canvasObject = createCanvasRect();
		obj.addCanvasObject(canvasObject);
	}

	function updateCanvasObject(obj, propertyObj){
		if (obj){
			var canvasObject = obj.canvasObject;
			if (canvasObject){
				canvasObject.set(propertyObj);
			} else {
				// how did this happen it should fail
				console.log('Error updating canvasObject');
			}
		}
	}

	function initialize(fabricCanvas){
		canvas = fabricCanvas;
	}

	this.controllers.modelContainer = {
		getNumberOfObjects: getNumberOfObjects,
		getRowSize: getRowSize,
		getInitialRenderPosition: getInitialRenderPosition,
		getColumnSize: getColumnSize,
		addColumns: addColumns,
		addRows: addRows,
		addRowsAndColumns: addRowsAndColumns,
		deleteAllObjects: deleteAllObjects,
		updateCanvasObject: updateCanvasObject,

		initialize: initialize,	
	};

}).apply(window.svgVsCanvas);
