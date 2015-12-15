window.svgVsCanvas = window.svgVsCanvas || {};

(function(){
	'use strict';
	var height;
	var width;
	var rowSize;
	var colSize;
	var listOfObjects = [];

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
		newListSize = colSize * rowSize;
		numOfObjectsToAdd = newListSize - getNumberOfObjects();

		for(var i = 0; i < numOfObjectsToAdd; i++){

		}
	}

	function addRows(numOfRows){
		rowSize += numOfRows;
	}

	function addRowsAndColumns(numOfRows, numOfCols){
		rowSize += numOfRows;
		colSize += numOfCols;
	}

	function getObjects(){
		return listOfObjects;
	}

	function createAnimateObject(){
		var animateObj = this.animateObjects.create();
		listOfObjects.push(animateObj);
	}

	function updateSize(){
		
	}

	function initialize(){

	}

	this.modelContainer = {
		getNumberOfObjects: getNumberOfObjects,
		getRows: getRows,
		getColumns: getColumns,
		addColumns: addColumns,
		addRows: addRows,
		addRowsAndColumns: addRowsAndColumns,

		initialize: initialize,	
	}

}).apply(window.svgVsCanvas);