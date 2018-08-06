import * as d3 from 'd3';
import * as gauge from '../images/gauge.svg';

let npsScore = 0;

document.addEventListener('DOMContentLoaded', () => {
  const ratingButtons = document.getElementsByClassName('new_rating');

  Array.from(ratingButtons)
    .forEach((button) => button.addEventListener('click', (event) => {
      event.preventDefault();
      getRatings(button);
    })
    );

  d3.svg(gauge).then((data) => {
    d3.select('#nps_gauge').node().appendChild(data.documentElement);
    npsScore = document.getElementById('nps_score').innerHTML;
    d3.select('#nps_gauge').select('.gauge-rotater').selectAll('path')
      .attr('fill', getNPSColor(npsScore));
  });

  // @TODO: rotate gauge according to npsScore once page has loaded
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
      npsScore = xmlHttp.response.nps_score;
      document.getElementById('nps_score').innerHTML = npsScore;
      d3.select('#nps_gauge').select('.gauge-rotater').selectAll('path')
        .attr('fill', getNPSColor(npsScore));
      
      // @todo: rotate dial according to npsScore
    }
  };  

  xmlHttp.send(JSON.stringify(params)); 
};

const getNPSColor = d3.scaleLinear()
  .domain([-100, 0, 100])
  .range(['#D22953', '#F9BE00', '#23D385']);
