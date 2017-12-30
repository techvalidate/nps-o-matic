const ratingRequest = function(requestType, url, dataToSend) {
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        if (requestType == 'GET') {
          let jsonData = JSON.parse(xhr.responseText);
          updateNpsInfo(jsonData);
        } else {
          getNpsData()
        }
      } else {
        alert('Request failed.  Returned status of ' + xhr.status);
      }
    }
  }
  xhr.open(requestType, url);
  xhr.setRequestHeader("Content-type", "application/json");
  dataToSend ? xhr.send(dataToSend) : xhr.send();
};

const changeDialClass = function(dial, npsRating) {
  let oldDialClass = dial.classList.item(1),
      newDialClass = 'nps-score-' + npsRating;

  dial.classList.remove(oldDialClass);
  dial.classList.add(newDialClass);
};

const updateNpsInfo = function(npsData) {
  let npsRating = npsData.nps,
      totalRatings = npsData.total_ratings,
      detractorsPercentage = npsData.detractors_percentage,
      promotersPercentage = npsData.promoters_percentage,
      $npsElement = document.querySelector('.dial-figure-score'),
      $totalRatingsElement = document.querySelector('.ratings-count-number'),
      $detractorsElement = document.querySelector('.detractors .ratings-percentange'),
      $promotersElement = document.querySelector('.promoters .ratings-percentange'),
      $dialFigure = document.querySelector('.dial-figure');

  $npsElement.innerHTML = npsRating;
  $totalRatingsElement.innerHTML = totalRatings;
  $detractorsElement.innerHTML = detractorsPercentage + '%';
  $promotersElement.innerHTML = promotersPercentage + '%';

  changeDialClass($dialFigure, npsRating);
};

const getNpsData = function() {
  ratingRequest('GET', '/api/nps');
};

const submitRating = function (event) {
  let ratingValue = event.currentTarget.querySelector('.submit-rating').value;
  let dataToSend = JSON.stringify({score: ratingValue});
  ratingRequest('POST', '/ratings', dataToSend);
};

document.addEventListener('DOMContentLoaded', function(event) {
  let ratingForms = document.querySelectorAll('.rating-form');

  ratingForms.forEach(function(ratingForm) {
    ratingForm.addEventListener('submit', function(event) {
      event.preventDefault();
      submitRating(event);
    });
  });
});
