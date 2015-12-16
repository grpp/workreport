window.svgVsCanvas = window.svgVsCanvas || {};
window.svgVsCanvas.model = window.svgVsCanvas.model || {};

(function(){
	'use strict';

	var AnimateObject = function(){
		this.color = 'red';
		this.orientation = null;
		this.velocity = null;
		this.direction = null; // Maybe direction doesn't even matter if we plan to have random motion
	};

	AnimateObject.prototype.RandomizeColor = function(){
		this.color = "#"+((1<<24)*Math.random()|0).toString(16);
	};

	
	AnimateObject.prototype.getCanvasSize = function(){
		if (this.canvasObject){
			var height = this.canvasObject.get('height');
			var width = this.canvasObject.get('width');

			return {
				height: height,
				width: width,
			};
		}

		return null;
	};

	AnimateObject.prototype.getCanvasPosition = function(){
		if (this.canvasObject){
			var left = this.canvasObject.get('left');
			var top = this.canvasObject.get('top');
			return {
				left: left,
				top: top,
			};
		}

		return null;
	};

	AnimateObject.prototype.addCanvasObject = function(canvasObject){
		this.canvasObj = canvasObject;
	};

	AnimateObject.prototype.removeCanvasObject = function(){
		this.canvasObj = null;
	};

	function createAnimateObject(){
		return new AnimateObject();
	}

	this.model.animateObjects = {
		create: createAnimateObject
	};

}).apply(window.svgVsCanvas);