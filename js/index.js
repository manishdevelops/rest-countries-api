'use strict'

const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownItems = document.querySelector('.dropdown-items');
const arrowIcon = document.querySelector('.arrow');
const themeBtn = document.querySelector('.main__header--themeToggle');
const Body = document.querySelector('body');
console.log(Body);

class App {
  constructor() {
    dropdownBtn.addEventListener('click', this._dropdownToggle)
    themeBtn.addEventListener('click', this._themeChange);
  }

  _dropdownToggle() {
    dropdownItems.classList.toggle('dropdown-hide');
    arrowIcon.classList.toggle('arrowNotAnimate');
  }

  _themeChange() {
    Body.classList.toggle('dark-theme');
  }

}

const app = new App();