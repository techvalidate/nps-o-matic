//  import * as d3 from "d3";
//  import gauge_image from '../images/gauge.svg'

document.addEventListener('DOMContentLoaded', () => {
  const ratingButtons = document.getElementsByClassName('new_rating');

  Array.from(ratingButtons)
    .forEach((button) => button.addEventListener('click', (event) => {
      event.preventDefault();
      getRatings(button);
    })
    );

  // const svgGauge = document.getElementById("gauge_object");
  // console.log(svgGauge);
  // svgGauge.getElementsByClassName('gauge-rotater').setAttribute("fill", "pink");
  // d3.xml(gauge_image).mimeType("image/svg+xml").get(function(error, xml) {
  //   console.log("blah");
  //     if (error) throw error;
  //     console.log(error);
  //     console.log(xml);
  //     document.body.appendChild(xml.documentElement);
  // });

  // console.log(document.getElementById('gauge_object').contentDocument);
  // console.log(d3.select(document.getElementById('gauge_object')).select('g.gauge-rotater'));
  // const paths = d3.select(document.getElementById("gauge_object").contentDocument).select('.gauge-rotater').selectAll('path');
  // paths.attr('fill', 'black');
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
      // fillDial('#3333');
    }
  };  

  xmlHttp.send(JSON.stringify(params)); 
};

// const fillDial = function(color) {
//     const svgDial = document.getElementById('nps_gauge');
//     const fillColor = svgDial.setAttribute('fill', color);
//    // http://www.petercollingridge.co.uk/tutorials/svg/interactive/javascript/
// };

