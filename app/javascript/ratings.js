document.addEventListener("DOMContentLoaded",function(){
  var allRatings = document.getElementsByClassName('new-rating');

  for (let i = 0; i < allRatings.length; i++){
    allRatings[i].addEventListener("click", (e) => {
      e.preventDefault();
      sendRating(allRatings[i]);
    });
  }

  function sendRating(rating_form) {
    ratingOptions =  {
      body: new FormData(rating_form),
      method: 'POST'
    }

    fetch('/ratings', ratingOptions).then(function(response) {
        return response.text();
      }).then(function(data){
        document.getElementById('appreciate').innerHTML = data;
    })
  };

});
