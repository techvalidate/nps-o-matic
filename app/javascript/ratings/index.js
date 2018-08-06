//  import * as d3 from "d3";

document.addEventListener('DOMContentLoaded', () => {
  const ratingButtons = document.getElementsByClassName('new_rating');

  Array.from(ratingButtons)
    .forEach((button) => button.addEventListener('click', (event) => {
      event.preventDefault();
      getRatings(button);
    })
    );

  // @TODO: append gauge to nps_gauge div and manipulate according to nps_score once page has loaded
  // drawGauge();
});

const getRatings = function(ratingClicked) {
  const xmlHttp = new XMLHttpRequest();
  const url = ratingClicked.action;
  const authenticityToken = ratingClicked.querySelector('[name="authenticity_token"]').value;
  const ratingScore = ratingClicked.querySelector('[name="rating[score]"]').value;
  const params = { rating: { score: ratingScore }};

  xmlHttp.open('POST', url, true); 
  xmlHttp.setRequestHeader('X-CSRF-Token', authenticityToken);
  xmlHttp.setRequestHeader('Content-Type', 'application/json');
  xmlHttp.responseType = 'json';
  
  xmlHttp.onreadystatechange = () => {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) { 
      document.getElementById('rate_tally').innerHTML = xmlHttp.response.rating_html;
      document.getElementById('nps_score').innerHTML = xmlHttp.response.nps_score;
      // @todo: transform dial according to nps score (xmlHttp.response.nps_score) 
    }
  };  

  xmlHttp.send(JSON.stringify(params)); 
};


//  const drawGauge = function(){
//    d3.xml(gauge_image).mimeType("image/svg+xml").get(function(error, xml) {
//      if (error) throw error;
//        console.log(error);
//      console.log(xml);
//      document.body.appendChild(xml.documentElement);
//    });
//    colorDial(color);  //Fill with corresponding color
//  }
//
// @TODO: function to get corresponding NPSCOLOR
// const getNPSColor = function(){};
//
// @Todo: this function should fill gauge's color and rotate according to score
// const transformDial = function(nps_score) {
//    const svgDial = document.getElementById('nps_gauge');
//    @Todo: Implement functionality to get color according to score
//    colorDial(color);
//    rotateDial();
// };

// const colorDial = function(color){
//    const paths = d3.select(document.getElementById("gauge_object").contentDocument).select('.gauge-rotater').selectAll('path');
//    paths.attr('fill', 'color);
//  };
//
// @TODO: 
// const rotateDial = function(valueToRotate){};
