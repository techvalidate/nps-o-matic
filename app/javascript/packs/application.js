/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

import * as d3 from 'd3';

$(() => {
    updateGauge();
});

const updateGauge = () => {
    const npsVal = d3.select('#hidden-nps-val').text();
    updateGaugeColor(npsVal);
    updateNpsValue(npsVal);
    rotateNeedle(npsVal);
};

const updateGaugeColor = (npsVal) => {
    const color = d3.scaleLinear().domain([-100, 0, 100]).range(["#D22953", "#F9BE00", "#23D385"]);
    d3.selectAll('#dial').style('fill', color(npsVal));
};

const updateNpsValue = (npsVal) => {
    d3.select('#rating-value').text(npsVal);
};

const rotateNeedle = (npsVal) => {
    const needle = d3.select('.needle');
    // x & y values found using math in: https://spin.atomicobject.com/2015/06/12/objects-around-svg-circle-d3-js/
    needle.attr("x", 76);
    needle.attr("y", 32);
    npsVal = scaleNpsValToGaugeDimensions(npsVal);
    debugger
    needle.transition().duration(1500).ease(d3.easeBack).attr('transform', `rotate(${npsVal}, 86, 86)`);
};

const scaleNpsValToGaugeDimensions = (npsVal) => {
    const ratingSign = Math.sign(npsVal); 
    npsVal = parseInt(npsVal);
    
    if (ratingSign) {
        npsVal = ratingSign < 0  ? npsVal - 30 : npsVal + 30;
    };
   
    return npsVal;
};
