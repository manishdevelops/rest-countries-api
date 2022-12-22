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
// const regionList = document.querySelectorAll('li');
// console.log(regionList);

class App {
  constructor() {
    this._generateCountryData();
    dropdownBtn.addEventListener('click', this._dropdownToggle.bind(this));
    themeBtn.addEventListener('click', this._themeChange);
    bodyBlur.addEventListener('click', this._toggleBlurBg);
    dropdownItems.addEventListener('click', this._searchByRegion.bind(this));
    this._init();
    // window.addEventListener('scroll', this._removeBlurBg);
  }

  _init() {
    inputCountry.focus();
    regionList[0].classList.add('dropdown-selected');
  }

  _dropdownToggle(e) {
    // regionList.forEach( list => list.classList.remove('dropdown-selected'));
    
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

      const countries = await url.json();
      countries.forEach( country => {
        app.append_countries(country);
      });
    }catch(error) {
      console.log('error');
    }
   } 
   apiCall();
  }

  append_countries(country) {
    const countryName = country.name;
    const population = country.population;
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

  _searchByRegion(e) {
    const countries = document.querySelectorAll('.countryContainer');
    console.log(countries.length);

    if(e.target.classList.contains('region-list')) {
      regionList.forEach( list => list.classList.remove('dropdown-selected'));
        e.target.classList.add('dropdown-selected');
        this._toggleBlurBg();
        let regionName = e.target.textContent.trim();
          countries.forEach( country => {
            const v = country.children[1].children[2].children[1].textContent;
            if(regionName === 'All') {
              country.style.display = 'block';
            }
            else if(!(regionName === v )) {
              country.style.display = 'none';
            }
            else{
              country.style.display = 'block';
            }
          });

    }
    //  else if(e.target.classList.contains('checkBox')) {
    //   console.log(1)
    //   regionList.forEach( list =>
    //     list.children[2].removeAttribute('checked')
    //     );
    //    e.target.setAttribute('checked', '');
    // }
  }

}

const app = new App();