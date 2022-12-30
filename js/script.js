'use strict'

const bg = document.querySelector('.main__blurBg');
const loadingText = document.querySelector('.main__loadingText');
let load = 0;
let interval = 0;
  
class animateApp {

  constructor() {
     interval = setInterval(() => this._blurring(), 20);
  }

  _scale(number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  }

  _remove() {
      document.querySelector('.main__loadingText').style.display = 'none';
      bg.classList.remove('main__blurBg');
  }

  _blurring() {
    load++;
    (load > 99) && (clearInterval(interval));
    (load > 99) && (this._remove());
    loadingText.innerText = `${load}%`;
    loadingText.style.opacity = this._scale(load, 0, 100, 1, 0);
    bg.style.backdropFilter = `blur(${this._scale(load, 0, 100, 30, 0)}px)`;
  }
}

const obj = new animateApp();
