// Create namespace
window.svgVsCanvas = window.svgVsCanvas || {};
window.svgVsCanvas.controllers = window.svgVsCanvas.controllers || {};

/*
	Does not work with canvas directly only the models themselves
*/
(function() {
	'use strict';

	// Default standard height and width objects that is created specific to test
	// Should not be changed after initialization
	var height = 20;
	var width = 20;
	var _this = this;

	// 2d Array
	var listOfObjects = [];

	function createAnimateObject(){
		var animateObj = _this.animateObjects.create();

		return animateObj;
	}

	function getHeight(){
		return height;
	}

	function getWidth(){
		return width;
	}

	function updateHeight(newHeight){
		if (newHeight)
			height = newHeight;
	}

	function updateWidth(newWidth){
		width = newWidth;
	}

	function updateSize(newHeight, newWidth){
		updateHeight(newHeight);
		updateWidth(newWidth);
	}

	function forAllObjects(callback){
		listOfObjects.forEach(function(row){
			row.forEach(function(value){
				callback(value);
			});
		});
	}

	function getObject(row, col){
		if(listOfObjects[row])
			if(listOfObjects[row][col])
				return listOfObjects[row][col];

		return null;
	}

	function getAllObjects(){
		var list = [];

		forAllObjects(function(value){
			list.push(value);
		});

		return list;
	}

	function createObject(row, col){
		var animateObj = createAnimateObject();
		listOfObjects[row][col] = animateObj;

		return animateObj;
	}

	function deleteAllObjects(){
		forAllObjects(function(obj){
			obj.removeCanvasObject();
		});
		listOfObjects = [];
	}

	function attachUpdateViewHandler(object, callback){
		object.updateView = callback;
	}

	function removeUpdateViewHandler(object, callback){
		if (object.updateView){
			// remove listener?
		}
	}

	function calculateSize(rows, cols, canvas){
		var size = canvas.getHeight() / rows;

		return {
			height: size,
			width: size,
		};
	}

	function create2DArray(rows, cols, canvas){
		var arr = [];
	    for(var i = 0; i < rows; i++) {
	        arr[i] = [];
	        arr[i].length = cols;
	    }

	    var size = calculateSize(rows, cols, canvas);

		updateSize(size.height, size.width);

	    return arr;
	}

	this.controllers.objectController = {
		getAllObjects: getAllObjects,
		getObject: getObject,
		//createObjects: createObjects,
		createObject: createObject,
		attachUpdateViewHandler: attachUpdateViewHandler,
		removeUpdateViewHandler: removeUpdateViewHandler,
		deleteAllObjects: deleteAllObjects,
		create2DArray: create2DArray,
		getHeight: getHeight,
		getWidth: getWidth,
	};

}).apply(window.svgVsCanvas);