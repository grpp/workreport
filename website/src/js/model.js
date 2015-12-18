window.svgVsCanvas = window.svgVsCanvas || {};
window.svgVsCanvas.model = window.svgVsCanvas.model || {};

(function(){
	'use strict';

	var AnimateObject = function(){
		this.color = 'red';
		this.orientation = null;
		this.velocity = 0;
		this.direction = null; // Maybe direction doesn't even matter if we plan to have random motion
		this.type = null;
		this.height = 0;
		this.width = 0;
		this.left = 0;
		this.top = 0;
	};

	AnimateObject.prototype.randomizeColor = function(){
		this.color = "#"+((1<<24)*Math.random()|0).toString(16);
	};

	AnimateObject.prototype.getType = function(){
		return this.type;
	};
	
	AnimateObject.prototype.setType = function(type){
		this.type = type;
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

	AnimateObject.prototype.setSize = function(h, w){
		this.height = h;
		this.width = w;
	};

	AnimateObject.prototype.setPosition = function(x, y){
		this.left = x;
		this.top = y;
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