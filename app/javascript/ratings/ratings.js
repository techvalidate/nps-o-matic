import { isNum } from '../util'

class Ratings {

  constructor() {
    // reading initial score from DOM not ideal; ideally, create api to ping for the latest score
    this.gaugeInitialScoreEl = document.getElementById('gauge-initial-score');

    this.gaugeTextEl = document.querySelector('.nps-interface .gauge-text');
    this.gaugeDialEl = document.querySelector('.nps-interface .gauge-dial');
    this.gaugeDialFillEl = document.querySelector('.nps-interface .gauge-dial-fill');
    this.rateButtonsEl = document.querySelector('.nps-interface .rate-buttons');
    this.legendCanvasEl = document.getElementById("nps-legend-canvas");
    this.legendCanvasContextEl = null;
    this.startingScore = 0;
  }

  normalizeScore(score) {
    if (!isNum(score)) return;

    return Math.floor(score < 0
      ? Math.max(score, -100)
      : Math.min(score, 100))
  }

  /* ranges for currently rotated svg:
    -100 NPS = -191deg; 0 NPS = -54deg; 100 NPS = 77deg */
  convertScoreToDegrees(score) {
    if (!isNum(score)) return;

    const degreesToScoreRatio = 1.360;
    const zeroPositionOffsetInDegrees = -54;
    const normalizedScore = this.normalizeScore(score);

    return normalizedScore * degreesToScoreRatio + zeroPositionOffsetInDegrees;
  }

  displayScore(score) {
    if (!isNum(score)) return;

    if(this.gaugeTextEl) {
      this.gaugeTextEl.textContent = this.normalizeScore(score);
    }
  }

  updateGauge(score) {
    if (!isNum(score)) return;

    this.gaugeDialEl.style.transform = `rotate(${this.convertScoreToDegrees(score)}deg)`;
    this.gaugeDialFillEl.style.fill = this.getCSSColorByScore(score);
    this.displayScore(score);
  }

  getCSSColorByScore(score) {
    if (!isNum(score)) return;

    const scaleInPixels = this.legendCanvasEl.width;
    const offset = scaleInPixels / 2;
    const multiplier = offset / 100;
    const normalizedScore = this.normalizeScore(score);
    const posX = normalizedScore * multiplier + offset;

    // at right edge of scale, capture the previous pixel
    const pixelCaptureX = posX === scaleInPixels ? -1 : 1;
    const { data: imgData } = this.legendCanvasContextEl.getImageData(posX, 0, pixelCaptureX, 1);
    const [ r, g, b ] = imgData;
    const pixelColor = `rgb(${r}, ${g}, ${b})`

    return pixelColor;
  }

  initializelegendCanvasEl() {
    if(this.legendCanvasEl) {
      this.legendCanvasEl.width = 594;
      this.legendCanvasEl.height = 16;

      this.legendCanvasContextEl = this.legendCanvasEl.getContext("2d");
      const grd = this.legendCanvasContextEl.createLinearGradient(0, 0, 594, 0);

      grd.addColorStop(0, "#D22953");
      grd.addColorStop(0.5, "#F9BE00");
      grd.addColorStop(1, "#23D385");

      this.legendCanvasContextEl.fillStyle = grd;
      this.legendCanvasContextEl.fillRect(0, 0, 594, 16);
    }
  }

  initializeScore() {
    if(this.gaugeInitialScoreEl) {
      const score = parseInt(this.gaugeInitialScoreEl.value, 10);
      this.startingScore = isNum(score) ? score : 0;
    }
  }

  initializeButtons() {
    if(this.rateButtonsEl) {
      this.rateButtonsEl.addEventListener('click', e => {
        const { ratingValue } = e.target.dataset;

        if(ratingValue) {
          this.postRating(ratingValue);
        }
      })
    }
  }

  postRating(ratingValue) {
    // console.log('postrating: ', ratingValue)
    // fetch('/ratings', {
    //   method: 'POST'
    // })
    //   .then(response => response.json())
    //   .then(json => this.renderUI(json)))
    //   .catch(errorHandler)
  }

  init() {
    this.initializelegendCanvasEl();
    this.initializeScore();
    this.initializeButtons();
    this.updateGauge(this.startingScore);

    window.addEventListener('scoreUpdateReceived', e => {
      const { score } = e.detail || {};

      if(isNum(score)){
        this.updateGauge(score);
      }
    })
  }
}

export default Ratings
