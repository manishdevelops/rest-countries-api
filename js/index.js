'use strict'

const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownItems = document.querySelector('.dropdown-items');
const arrowIcon = document.querySelector('.arrow');
const themeBtn = document.querySelector('.main__header--themeToggle');
const Body = document.querySelector('body');
const bodyBlur = document.querySelector('.body-blur');
const inputCountry = document.querySelector('#inputCountry');
const countriesSection = document.querySelector('.main__section1');
const regionList = document.querySelectorAll('.region-list');
const countryNameInput = document.querySelector('#inputCountry');
const loadMoreBtn = document.querySelector('.load-more-btn');
var countries;
var currIndex = 0;

class App {
  // countries;
  // currIndex = 0;
  constructor() {
    this._generateCountryData();
    dropdownBtn.addEventListener('click', this._dropdownToggle.bind(this));
    themeBtn.addEventListener('click', this._themeChange);
    bodyBlur.addEventListener('click', this._toggleBlurBg);
    countryNameInput.addEventListener('keyup', this._searchByCountryName.bind(this));
    dropdownItems.addEventListener('click', this._searchByRegion.bind(this));
    loadMoreBtn.addEventListener('click', this._displayInitialCountries.bind(this));
    this._init();
    // window.addEventListener('scroll', this._removeBlurBg);
  }

  _init() {
    inputCountry.focus();
    regionList[0].classList.add('region-active');
    //load button display
    setTimeout(function() {
      loadMoreBtn.style.display = 'block';
    },3000) 
  }

  _dropdownToggle(e) {
    dropdownItems.classList.toggle('dropdown-toggle-desk');
    dropdownItems.classList.toggle('dropdown-items-tab');
    bodyBlur.classList.toggle('bg-overlay-tab');
  }

  _themeChange() {
    Body.classList.toggle('dark-theme');
  }

  _toggleBlurBg() {
    bodyBlur.classList.remove('bg-overlay-tab');
    dropdownItems.classList.toggle('dropdown-items-tab');
    dropdownItems.classList.toggle('dropdown-toggle-desk');
  }

  // _removeBlurBg() {
  //   bodyBlur.classList.remove('bg-overlay-tab');
  //   dropdownItems.classList.remove('dropdown-items-tab');
  //   dropdownItems.classList.remove('dropdown-toggle-desk');
  // }

  _generateCountryData() {
   async function apiCall() {
    try {
      const url = await fetch('https://restcountries.com/v2/all');

      if(!url.ok) {
        throw new error(`advice not found(${response.status})`);
      }

       countries = await url.json();
      // countries.forEach( country => {
      //   app.append_countries(country);
      // });
      app._displayInitialCountries();
    }catch(error) {
      const p = document.createElement('p');
      p.classList.add('error_display_text');
      p.textContent = `Something went wrong 🥲🥲🥲 (${error.message}).Try Again!`;
      countriesSection.append(p);
      loadMoreBtn.style.display = 'none';
    }
   } 
   apiCall();
  }

  _appendCountries(country) {
    const countryName = country.name;
    const population = country.population.toLocaleString('en-US');
    const region = country.region;
    const capital = country.capital;
    const flag = country.flags['svg'];
    const addCountry = document.createElement('div');
    addCountry.classList.add('countryContainer');
    addCountry.innerHTML = `
    <div class="countryFlagContainer">
    <img class="countryFlag" src="${flag}" alt="Country flag">
  </div>
    <div class="countryDetails">
      <p class="countryName">${countryName}</p>
      <p class="countryPopulation"><span>Population:</span>${population}</p>
      <p class="countryRegion"><span>Region:</span><span>${region}</span></p>
      <p class="countryCapital"><span>Capital:</span>${capital}</p>
    </div>
    `
    countriesSection.append(addCountry);
  }

  _displayInitialCountries(e) {
    if(e) {
      this._manageActiveRegion();
      regionList[0].classList.add('region-active');
    }
    const length = countries.length;
    const countriesContainer = document.querySelectorAll('.countryContainer');
    countriesContainer.forEach( countryContainer => countryContainer.style.display = 'block');
      for(let i = currIndex; i < length; i++) {
        this._appendCountries(countries[i]);
        if(i === 27 || i === 55 || i === 83 || i === 111 || i === 139 || i === 167 || i === 195 ||i === 223 ) 
          break;
        if(i === 249) {
          loadMoreBtn.style.display = 'none';
        }
      }
      currIndex += 28;
  }

  _searchByCountryName(e) {
    e.preventDefault();
    const countryName = countryNameInput.value.trim();
    const countryNameLength = countryName.length;
    const countriesContainer = document.querySelectorAll('.countryContainer');
    countriesContainer.forEach( countryContainer => {
      const name = countryContainer.children[1].children[0].textContent.trim().slice(0,countryNameLength);
      countryName.toLowerCase() === name.toLowerCase() ? countryContainer.style.display = 'block' : countryContainer.style.display = 'none'
    });
  }

  _manageActiveRegion() {
    regionList.forEach( list => list.classList.remove('region-active'));
  }

  _searchByRegion(e) {
    const countriesContainer = document.querySelectorAll('.countryContainer');
    if(e.target.classList.contains('region-list')) {
      this._manageActiveRegion();
        e.target.classList.add('region-active');
        this._toggleBlurBg();
        let regionName = e.target.textContent.trim();
        dropdownBtn.textContent = regionName;
          countriesContainer.forEach( countryContainer => {
            const regName = countryContainer.children[1].children[2].children[1].textContent;
            ((regionName === 'All') &&  (countryContainer.style.display = 'block')) || (regionName === regName ) && (countryContainer.style.display = 'block') || (countryContainer.style.display = 'none');
          });
    }
  }
}

const app = new App();