window.svgVsCanvas = window.svgVsCanvas || {};
window.svgVsCanvas.controllers = window.svgVsCanvas.controllers || {};


/* 
	- High level interaction should go here
	- Should only keep track of container information such as height and width
	- Whenever you need to act on canvas
*/
(function(){
	'use strict';
	var rowSize = 0;
	var colSize = 0;
	var _this = this;

	// is always just equal to rowSize or colSize minus 1
	var rowLength;
	var colLength;

	// Is the canvas fabrics wrapper of the canvas
	var canvas; 

	// Controllers
	var objectController;

	function getNextAvailablePosition(){
		if (rowSize > 0 && colSize > 0){
			for (var x = 0; x < rowSize; x++){
				for(var y = 0; y < colSize; y++){
					var object = objectController.getObject(x,y);
					if (!object)
						return {
							row: x,
							col: y
						};
				}
			}
		}
		return null;
	}

	// current position doesnt make sense this is for initializing current position
	// only for rendering test
	function getInitialRenderPosition(row, col){
		// We can either use the canvas size and calculate the height and width
		// or we can use the currentRow and current Height to determine the size
		var width = objectController.getWidth();
		var height = objectController.getHeight();
		var top = row * height;
		var left = col * width;

		return {
			top: top,
			left: left,
			height: height,
			width: width,
		};
	}

	function getMaxNumberOfObjects(){
		return rowSize * colSize;
	}

	function getRowSize(){
		return rowSize;
	}

	function getColumnSize(){
		return colSize;
	}

	// Private
	function addColumns(numOfCols){
		colSize += numOfCols;
		colLength = colSize - 1;
	}

	// Private
	function addRows(numOfRows){
		rowSize += numOfRows;
		rowLength = rowSize - 1;
	}

	function addRowsAndColumns(numOfRows, numOfCols){
		addColumns(numOfCols);
		addRows(numOfRows);

		objectController.create2DArray(rowSize, colSize, canvas);
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

	function createCanvasObject(row, col){
		var object = _this.controllers.objectController.createObject(row, col);
		initializeRectObject(object);
		object.type = _this.controllers.viewController.renderType.CANVAS;
		var position = getInitialRenderPosition(row, col);
		object.setSize(position.height, position.width);
		object.setPosition(position.left, position.top);

		return object;
	}

	function deleteAllObjects(){
		// remove from canvas
		var listOfObjects = _this.controllers.objectController.getAllObjects();
		listOfObjects.forEach(function deleteModelObject(object){
			var canvasObject = object.canvasObject;
			if (canvasObject){
				canvas.remove(canvasObject);
			}
		});

		// Clear all objects within array
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
				throw 'Error updating canvasObject';
			}
		}
	}

	function createAllCanvasObjects(){
		if (rowSize > 0 && colSize > 0){
			for (var x = 0; x < rowSize; x++){
				for(var y = 0; y < colSize; y++){
					createCanvasObject(x,y);
				}
			}
		}
	}

	function initialize(fabricCanvas, p_objectController){
		canvas = fabricCanvas;
		objectController = p_objectController;
	}

	this.controllers.containerController = {
		getMaxNumberOfObjects: getMaxNumberOfObjects,
		getRowSize: getRowSize,
		getInitialRenderPosition: getInitialRenderPosition,
		getColumnSize: getColumnSize,
		addColumns: addColumns,
		addRows: addRows,
		addRowsAndColumns: addRowsAndColumns,
		deleteAllObjects: deleteAllObjects,
		updateCanvasObject: updateCanvasObject,
		createAllCanvasObjects: createAllCanvasObjects,
		createCanvasObject: createCanvasObject,
		initialize: initialize,
		getNextAvailablePosition: getNextAvailablePosition,
	};

}).apply(window.svgVsCanvas);
