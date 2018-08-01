/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

import * as d3 from 'd3';

function test() {
    // update color based on value ------------
    // https://github.com/d3/d3-scale
    const rating = d3.select('#hidden-rating').text();
    const color = d3.scaleLinear().domain([-100, 0, 100]).range(["#D22953", "#F9BE00", "#23D385"]);
    d3.selectAll('#dial').style('fill', color(rating));
    d3.select('#rating-value').text(rating);
    const needle = d3.select('.needle');
    // <circle cx="86" cy="86" r="43.8" class="circle">
    var originX = 86;
    var originY = 86;
    var innerCircleRadius = 43.8;    
    // needle.attr("transform", "rotate(45, 200, 200)");
    var svg = d3.select('.circle');

    // update rating value in gauge 
    // rotate dial -----------
};

window.onload = () => { 
    test();
}