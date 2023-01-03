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
let countriesContainer;

class App {
  _currIndex = 0;
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
    regionList[0].classList.add('region-active');
    //load button display
    setTimeout(function() {
      app._setLoadMoreBtn('block');
    }, 3000);
    
    setTimeout(function() {
      app._revealingCountries();
    }, 3000);
  }

  _revealingCountries() {
    const revealCountry = function(entries, observer) {
      const [entry] = entries;
      console.log(entry);
      if(!entry.isIntersecting) return;
      entry.target.classList.remove('country--hidden');
      observer.unobserve(entry.target);
    }
    const countryObserver = new IntersectionObserver(revealCountry, {
      root:null,
      threshold:.15,
     
    });
    this._selectAllCountries();
    countriesContainer.forEach(function (country) {
      countryObserver.observe(country);
      country.classList.add('country--hidden');
    });
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

       const countries = await url.json();
       countries.forEach( country => {
          app._appendCountries(country);
      });
      app._displayInitialCountries();
    }catch(error) {
      const p = document.createElement('p');
      p.classList.add('error_display_text');
      p.textContent = `Something went wrong 🥲🥲🥲 (${error.message}).Try Again!`;
      countriesSection.append(p);
      this._setLoadMoreBtn('none');
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
    addCountry.style.display = 'none';
    countriesSection.append(addCountry);
    console.log('aa');
  }

  _selectAllCountries() {
    countriesContainer = document.querySelectorAll('.countryContainer');
  }

  _setLoadMoreBtn(val) {
    loadMoreBtn.style.display = val;
  }

  _displayTotalLoadedCountries() {
    this._selectAllCountries();
    for(let i = 0; i < this._currIndex; i++) {
      countriesContainer[i].style.display = 'block';
    }
  }

  _displayCountriesTillCurrentIndex() {
    for(let i = this._currIndex; i < 250; i++) {
      countriesContainer[i].style.display = 'block';
      if(i === 27 || i === 55 || i === 83 || i === 111 || i === 139 || i === 167 || i === 195 ||i === 223 ) {
        break;
      }
      (i === 249) && ( this._setLoadMoreBtn('none'));
    }
    this._currIndex += 28;
  }

  _displayInitialCountries(e) {
    this._selectAllCountries();
    if(e) {
      this._setLoadMoreBtn('none');
      this._manageActiveRegion();
      regionList[0].classList.add('region-active');
      this._displayTotalLoadedCountries();
      dropdownBtn.textContent = 'Filter by Region';
      const divParent = document.createElement('div');
      divParent.classList.add('main__countriesLoaderAnimation');
      const divChild = document.createElement('div');
      divChild.classList.add('loader');
      divChild.classList.add('load');
      divParent.append(divChild);
      countriesSection.append(divParent);
      setTimeout(() => {
        this._displayCountriesTillCurrentIndex();
        divParent.remove();
        (this._currIndex < 249) && (this._setLoadMoreBtn('block'));

      }, 2000);
      return;
    }
    this._displayCountriesTillCurrentIndex();
  }

  _searchByCountryName(e) {
    this._setLoadMoreBtn('none');
    const countryName = countryNameInput.value.trim();
    const countryNameLength = countryName.length;
    this._selectAllCountries();
    countriesContainer.forEach( countryContainer => {
      const name = countryContainer.children[1].children[0].textContent.trim().slice(0,countryNameLength);
      countryName.toLowerCase() === name.toLowerCase() ? countryContainer.style.display = 'block' : countryContainer.style.display = 'none';
    });

    if(countryName === '') {
      countriesContainer.forEach( countryContainer => { countryContainer.style.display = 'none' });
      this._displayTotalLoadedCountries();
      this._setLoadMoreBtn('block');
      dropdownBtn.textContent = 'Filter by Region';
      this._manageActiveRegion();
      regionList[0].classList.add('region-active');
    }
  }

  _manageActiveRegion() {
    regionList.forEach( list => list.classList.remove('region-active'));
  }

  _searchByRegion(e) {
    if(e.target.classList.contains('region-list')) {
      (inputCountry.value.length > 0) && (countriesContainer.forEach( country => country.style.display = 'none'));
      (inputCountry.value.length > 0)  && (this._setLoadMoreBtn('block'));
      this._manageActiveRegion();
      e.target.classList.add('region-active');
      this._toggleBlurBg();
      let regionName = e.target.textContent.trim();
      dropdownBtn.textContent = regionName;
      for(let  i = 0; i < this._currIndex; i++) {
        const regName = countriesContainer[i].children[1].children[2].children[1].textContent;
        ((regionName === 'All') &&  (countriesContainer[i].style.display = 'block')) || (regionName === regName ) && (countriesContainer[i].style.display = 'block') || (countriesContainer[i].style.display = 'none');
      }
    }
  }
}

const app = new App();