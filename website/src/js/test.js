// Create namespace
window.svgVsCanvas = window.svgVsCanvas || {};

(function() {
	'use strict';
	var c = document.getElementById("canvasId");
	var ctx = c.getContext("2d");
	ctx.beginPath();
	ctx.arc(95,50,40,0,2*Math.PI);
	ctx.stroke();
}).apply(window.svgVsCanvas);