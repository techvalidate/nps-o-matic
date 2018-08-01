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
    let rating = d3.select('#hidden-rating').text();
    const color = d3.scaleLinear().domain([-100, 0, 100]).range(["#D22953", "#F9BE00", "#23D385"]);
    d3.selectAll('#dial').style('fill', color(rating));
    d3.select('#rating-value').text(rating);
    const needle = d3.select('.needle');

    const needleOriginX =  86 + (44 * Math.sin(0))
    const needleOriginY =  86 - (44 * Math.cos(0))
    needle.attr("x", needleOriginX - (10))
    needle.attr("y", needleOriginY - (10))
    rating = updateRating(rating)
    needle.transition().duration(1500).ease(d3.easePoly).attr("transform", `rotate(${rating}, 86, 86)`);

    // update rating value in gauge 
    // rotate dial -----------
};

function updateRating(rating) {
    // if (Math.sign(rating)) {
        // debugger
        return Math.sign(rating) < 0  ? parseInt(rating) - 30 : parseInt(rating) + 30 
 
}

window.onload = () => { 
    test();
}