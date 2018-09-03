document.addEventListener('DOMContentLoaded', () => {
  const allRatings = document.getElementsByClassName('new-rating');

  Array.from(allRatings).forEach((ratingItem) => {
    ratingItem.addEventListener('click', (e) => {
      e.preventDefault();
      sendRating(ratingItem);
    });
  });

  sendRating = (ratingForm) => {
    ratingOptions =  {
      body: new FormData(ratingForm),
      method: 'POST'
    };

    fetch('/ratings', ratingOptions).then((response) => {
      response.text();
    }).then((data) => {
      document.getElementById('appreciate').innerHTML = data;
    });
  };
});
