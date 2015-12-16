// Create namespace
window.svgVsCanvas = window.svgVsCanvas || {};
window.svgVsCanvas.controllers = window.svgVsCanvas.controllers || {};

/*
	Does not work with canvas directly only the models themselves
*/
(function() {
	'use strict';
	var height;
	var width;
	var _this = this;

	var listOfObjects = [];

	function createAnimateObject(){
		var animateObj = _this.animateObjects.create();
		listOfObjects.push(animateObj);

		return animateObj;
	}

	function updateHeight(newHeight){
		height = newHeight;
	}

	function updateWidth(newWidth){
		width = newWidth;
	}

	function forEachObject(callback){
		listOfObjects.forEach(function(object){
			callback(object);
		});
	}

	function getObject(index){
		return listOfObjects[index];
	}

	function getObjects(){
		return listOfObjects;
	}

	function createObjects(numOfObjectsToAdd){
		var objects = [];

		for(var i = 0; i < numOfObjectsToAdd; i++){
			objects.push(createAnimateObject());
		}

		return objects;
	}

	function createObject(){
		return createAnimateObject();
	}

	function deleteAllObjects(){
		forEachObject(function(obj){
			obj.removeCanvasObject();
		});
		listOfObjects = [];
	}

	function attachUpdateViewHandler(object, callback){
		//removeUpdateHandler(object, callback);
		object.updateView = callback;
	}

	function removeUpdateViewHandler(object, callback){
		if (object.updateView){
			// remove listener?
		}
	}

	function initialize(){

	}

	this.objectController = {
		initialize: initialize,
		updateHeight: updateHeight,
		updateWidth: updateWidth,
		forEachObject: forEachObject,
		getObjects: getObjects,
		getObject: getObject,
		createObjects: createObjects,
		createObject: createObject,
		attachUpdateViewHandler: attachUpdateViewHandler,
		removeUpdateViewHandler: removeUpdateViewHandler,
		deleteAllObjects: deleteAllObjects,
	};

}).apply(window.svgVsCanvas);