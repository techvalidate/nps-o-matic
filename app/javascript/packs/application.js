/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

console.log('Hello World from Webpacker');

window.onload = function() {
	// TODO: Update color gauge color
	// document.getElementById("Oval-3").style.fill = "yellow";
	// document.getElementById("caret-copy-2").style.fill = "yellow";

	// Rotate gauge
	var npsValue = document.getElementById("npsValue").getAttribute('data-nps');
	document.getElementById("gaugeRotater").setAttribute("transform", "rotate(" + npsValue + ", 86.5, 86)");
}


