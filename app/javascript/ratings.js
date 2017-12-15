// Gets ratings
document.addEventListener('DOMContentLoaded', () => {
  const rateBtns = document.querySelectorAll('.js-rate-btn');
  const termsCount = document.querySelector('.js-terms-count');
  const termsPromoter = document.querySelector('.js-terms-promoter');
  const termsDetractor = document.querySelector('.js-terms-detractor');
  const npsScore = document.querySelector('.js-nps-score');

  const detractors = [];
  const neutrals = [];
  const promoters = [];

  let currentRatings = [];
  let promoterPercentage = 0;
  let detractorPercentage = 0;
  let nps = 0;

  // Populates detractors, neutrals and promoters arrays
  const buildAndUpdateMetrics = (ratings) => {
    for (const rating of ratings) {
      if (rating.score < 7) {
        detractors.push(rating);
      } else if (rating.score <= 7 || rating.score === 8) {
        neutrals.push(rating);
      } else {
        promoters.push(rating);
      }
    }
    computePromoter();
    computeDetractor();
    computeNps();
    clearClass();
    determineColorCode();
  };

  // API call to get all raitings
  const getRatings = () => {
    fetch('/api/ratings')
      .then((response) => response.json())
      .then((data) => {
        currentRatings = data;
        buildAndUpdateMetrics(data);
        paintRatings(data.length);
      })
      .catch((error) => {
        // Flash message would be more practical, but the alert is okay for code challenge
        alert(error);
      });
  };

  // Comppute promoter score
  const computePromoter = () => {
    const promoterScore = Math.round((promoters.length / currentRatings.length) * 100) || 0;
    promoterPercentage = promoterScore;
    paintPromoters(promoterScore);
  };

  // Compute detractor score
  const computeDetractor = () => {
    const detractorScore = Math.round((detractors.length / currentRatings.length) * 100) || 0;
    detractorPercentage = detractorScore;
    paintDetractor(detractorScore);
  };

  // Compute nps
  const computeNps = () => {
    nps = Math.round(promoterPercentage - detractorPercentage) || 0;
    paintNps(nps);
  };

  // Paint number of ratings
  const paintRatings = (count) => {
    termsCount.innerHTML = count;
  };

  // Paint percentage of promoters
  const paintPromoters = (count) => {
    termsPromoter.innerHTML = count;
  };

  // Paint percentage of promoters
  const paintDetractor = (count) => {
    termsDetractor.innerHTML = count;
  };

  // Paint number of ratings
  const paintNps = (count) => {
    npsScore.innerHTML = count;
  };

  // Removes classes that style dial
  const clearClass = () => {
    npsScore.classList.remove(npsScore.classList[2]);
  };

  // Checks to see if number is within a certain range
  const inRange = (num, min, max) => {
    if (num === 0 && min === 0 && max === 0) return true;
    return num > min && num <= max;
  };

  // Adds class that controls which color is displayed
  const setColorCode = (colorClass) => {
    npsScore.classList.add(colorClass);
  };

  // Determine which color the dial should get
  const determineColorCode = () => {
    if (inRange(nps, -101, -100)) {
      setColorCode('nps__score--0');
    } else if (inRange(nps, -99, -75)) {
      setColorCode('nps__score--1');
    } else if (inRange(nps, -74, -50)) {
      setColorCode('nps__score--2');
    } else if (inRange(nps, -49, -25)) {
      setColorCode('nps__score--3');
    } else if (inRange(nps, -24, 24)) {
      setColorCode('nps__score--4');
    } else if (inRange(nps, 24, 49)) {
      setColorCode('nps__score--5');
    } else if (inRange(nps, 49, 74)) {
      setColorCode('nps__score--6');
    } else if (inRange(nps, 74, 99)) {
      setColorCode('nps__score--7');
    } else {
      setColorCode('nps__score--8');
    }
  };

  const onRatingClick = (score) => {
    const currentRating = { score };
    currentRatings.push(currentRating);
    paintRatings(currentRatings.length);
    buildAndUpdateMetrics([currentRating]);
  };

  // Binds click event to update nps data
  for (const rateBtn of rateBtns) {
    rateBtn.addEventListener('click', (e) => {
      onRatingClick(parseInt(e.currentTarget.value));
    });
  }

  getRatings();
});
