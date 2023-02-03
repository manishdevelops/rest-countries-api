'use strict'

const bg = document.querySelector('.main__blurBg');
const loadingText = document.querySelector('.main__loadingText');
  
class animateApp {
  _load = 0;
  _interval = 0;
  constructor() {
     this._interval = setInterval(() => this._blurring(), 40);
  }

  _scale(number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  }

  _remove() {
      document.querySelector('.main__loadingText').style.display = 'none';
      bg.classList.remove('main__blurBg');
  }

  _blurring() {
    this._load++;
    (this._load > 99) && (clearInterval(this._interval));
    (this._load > 99) && (this._remove());
    loadingText.innerText = `${this._load}%`;
    loadingText.style.opacity = this._scale(this._load, 0, 100, 1, 0);
    bg.style.backdropFilter = `blur(${this._scale(this._load, 0, 100, 30, 0)}px)`;
  }
}

const obj = new animateApp();
