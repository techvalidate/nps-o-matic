document.addEventListener('DOMContentLoaded', () => {
  const ratingButtons = document.getElementsByClassName('new_rating');

  Array.from(ratingButtons)
    .forEach((button) => button.addEventListener('click', (event) => {
      event.preventDefault();
      getRatings(button);
    })
    );
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
      document.getElementById('nps_value').innerHTML = xmlHttp.response.nps_value;
    }
  };  


  xmlHttp.send(JSON.stringify(params)); 
};

