const xmlHttp = new XMLHttpRequest();

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
  const url = ratingClicked.action;
  const authenticityToken = ratingClicked.querySelector('[name="authenticity_token"]').value;
  const ratingScore = ratingClicked.querySelector('[name="rating[score]"]').value;
  const params = `rating[score]=${ratingScore}`;

  xmlHttp.onreadystatechange = () => {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) { // checks if response was with status -> "OK"
      // var re = JSON.parse(xmlHttp.responseText); // gets data and parses it, in this case we know that data type is JSON. 
      // if(re["Status"] === "Success"){
      // 
      //  
      // }
      // else {
      //     
      // }
    }
  };  

  xmlHttp.open('POST', url); 
  xmlHttp.setRequestHeader('X-CSRF-Token', authenticityToken);
  xmlHttp.send(params); 
};

