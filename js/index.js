'use strict'

const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownItems = document.querySelector('.dropdown-items');
const arrowIcon = document.querySelector('.arrow');
const themeBtn = document.querySelector('.main__header--themeToggle');
const Body = document.querySelector('body');
const bodyBlur = document.querySelector('.body-blur');
const inputCountry = document.querySelector('#inputCountry');
const countriesContainer = document.querySelector('.main__section1');
// const regionList = document.querySelectorAll('li');
// console.log(regionList);

class App {
  constructor() {
    inputCountry.focus();
    this._generateCountryData();
    dropdownBtn.addEventListener('click', this._dropdownToggle);
    themeBtn.addEventListener('click', this._themeChange);
    bodyBlur.addEventListener('click', this._toggleBlurBg);
    // dropdownItems.addEventListener('click', this._searchByRegion(e));
    // window.addEventListener('scroll', this._removeBlurBg);

  }

  _dropdownToggle() {
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

  _removeBlurBg() {
    bodyBlur.classList.remove('bg-overlay-tab');
    dropdownItems.classList.remove('dropdown-items-tab');
    dropdownItems.classList.remove('dropdown-toggle-desk');
  }

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
    // console.log(country)
    const countryName = country.name;
    const population = country.population;
    const region = country.region;
    const capital = country.capital;
    const flag = country.flags['svg'];
    // console.log(flag)
    
    const addCountry = document.createElement('div');
    addCountry.classList.add('countryContainer');
    addCountry.innerHTML = `
    <div class="countryFlagContainer">
    <img class="countryFlag" src="${flag}" alt="Country flag">
  </div>
    <div class="countryDetails">
      <p class="countryName">${countryName}</p>
      <p class="countryPopulation"><span>Population:</span>${population}</p>
      <p class="countryRegion"><span>Region:</span>${region}</p>
      <p class="countryCapital"><span>Capital:</span>${capital}</p>
    </div>
    `
    countriesContainer.append(addCountry);
  }

  _searchByRegion(e) {
    console.log(e)
  }

}

const app = new App();