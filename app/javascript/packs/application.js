/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

/* color reference for gauge */
r_neg_100 = 210;
g_neg_100 = 41;
b_neg_100 = 83;

r_0 = 249;
g_0 = 190;
b_0 = 0;

r_100 = 35;
g_100 = 211;
b_100 = 133;

console.log('Hello World from Webpacker');

window.onload = function() {
	var npsValue = parseInt(document.getElementById("npsValue").getAttribute('data-nps'));
	if (npsValue < 0) {
		var r = Math.round(r_0 + (r_0 - r_neg_100) * (npsValue / 100));
		var g = Math.round(g_0 + (g_0 - g_neg_100) * (npsValue / 100));
		var b = Math.round(b_0 + (b_0 - b_neg_100) * (npsValue / 100));
	} else {
		var r = Math.round(r_0 + (r_100 - r_0) * (npsValue / 100));
		var g = Math.round(g_0 + (g_100 - g_0) * (npsValue / 100));
		var b = Math.round(b_0 + (b_100 - b_0) * (npsValue / 100));
	}
	// Update color gauge color
	var rgbString = "rgb(" + r + "," + g + "," + b + ")";
	document.getElementById("Oval-3").style.fill = rgbString
	document.getElementById("caret-copy-2").style.fill = rgbString;

	// Rotate gauge
	document.getElementById("gaugeRotater").setAttribute("transform", "rotate(" + npsValue + ", 86.5, 86)");

	// Update gauge text
	document.getElementById("npsValue").textContent = npsValue;
}


