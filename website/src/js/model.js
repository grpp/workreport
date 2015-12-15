window.svgVsCanvas.model = window.svgVsCanvas.model || {};

(function(){
	'use strict';

	var AnimateObject = function(){
		this.color;
	};

	AnimateObject.prototype.RandomizeColor = function(){
		this.color = "#"+((1<<24)*Math.random()|0).toString(16);
	};

	function createAnimateObject(){
		return new AnimateObject();
	};

	this.animateObjects = {
		create: createAnimateObject 
	}

}).apply(window.svgVsCanvas);