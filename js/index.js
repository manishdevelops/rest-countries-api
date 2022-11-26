'use strict'

const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownItems = document.querySelector('.dropdown-items');
const arrowIcon = document.querySelector('.arrow');

class App {
  constructor() {
    dropdownBtn.addEventListener('click', this._dropdownToggle)
  }

  _dropdownToggle() {
    dropdownItems.classList.toggle('dropdown-hide');
    // arrowIcon.toggleAttribute("animation");
    arrowIcon.classList.toggle('arrowNotAnimate');
  }

}

const app = new App();