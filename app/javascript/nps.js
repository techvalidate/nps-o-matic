//First, intercept the form submit with js and handle form processing with ajax
document.addEventListener("DOMContentLoaded", () => {
  let npsRating = parseInt(document.querySelector('.rating-nps').textContent);
  const buttons = document.querySelectorAll("input.rating-button");
  const ratingForms = document.querySelectorAll(".new_rating");
  const meterColumn = document.querySelector('.appreciate .panel')

  // Add event listeners to each of the forms to handle submit
  Array.from(ratingForms, form => form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitRating(form);
  }));

  //Handle the form submit, create ajax call to controller and then append result partial to view
  const submitRating = (rating) => {
    //create Ajax call to controller passing in the score as a param
    const requestRating = new Request('/ratings', {
      body: new FormData(rating),
      method: 'POST'
    });

    fetch(requestRating).then(function(response) {
      return response.text();
    }).then(function(response){
      meterColumn.innerHTML = response;
      npsRating = parseInt(document.querySelector('.rating-nps').textContent);
      updateDial(npsRating);
    })
  };

  const getColor = (npsRating) => {

    //if it is a negative rating, use red and yellow, if it is positive then use green and yellow
    let compColor = 'F9BE00';
    let baseColor = '23D385'

    if(npsRating < 0) {
      baseColor = 'D22953';
      compColor = 'F9BE00';

      //make npsRating postive
      npsRating = Math.abs(npsRating);
    }

    const ratio = npsRating * .01;
    const hex = (x) => {
        x = x.toString(16);
        return (x.length == 1) ? '0' + x : x;
    };

    const r = Math.ceil(parseInt(baseColor.substring(0,2), 16) * ratio + parseInt(compColor.substring(0,2), 16) * (1-ratio));
    const g = Math.ceil(parseInt(baseColor.substring(2,4), 16) * ratio + parseInt(compColor.substring(2,4), 16) * (1-ratio));
    const b = Math.ceil(parseInt(baseColor.substring(4,6), 16) * ratio + parseInt(compColor.substring(4,6), 16) * (1-ratio));
    const ratingColor = hex(r) + hex(g) + hex(b);

    return ratingColor;
  };

  //On page load animate the dial and add color
  const updateDial = (npsRating) => {
    const dialOuter = document.querySelector('#gauge-outer');
    const dial = document.querySelector('#gauge');
    const color = getColor(npsRating);

    dialOuter.setAttribute("style", "transform: rotate(" + npsRating + "deg");
    dial.setAttribute("style", "fill: #" + color + "");
  }

//Call once on initial dom load
updateDial(npsRating);
});
