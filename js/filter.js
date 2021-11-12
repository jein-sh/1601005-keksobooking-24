//Модуль фильтрации объявлений
import {renderAdPins, clearLayers} from './map.js';
import {getData} from './api.js';
import { debounce } from './utils/debounce.js';

const SIMILAR_AD_COUNT = 10;

const mapFilters = document.querySelector('.map__filters');
const housingTypeInput = mapFilters.querySelector('#housing-type');
const housingPriceInput = mapFilters.querySelector('#housing-price');
const housingRoomsInput = mapFilters.querySelector('#housing-rooms');
const housingGuestsInput = mapFilters.querySelector('#housing-guests');
const housingFeatures = mapFilters.querySelector('#housing-features');
const mapFeatures= document.getElementsByName('features');

// Фильтрация объявлений по типу жилья

const setChangeType = (arr, cb) => {

  housingTypeInput.addEventListener('change', (evt) => {
    clearLayers();

    const type = evt.target.value;
    let similarAds;

    if (type === 'any') {
      similarAds = arr;
    } else {
      const getFilteredAds = (arr) => {
        return arr.filter((obj) => {
          return obj.offer.type === type;
        });
      };
      similarAds = getFilteredAds(arr);
    }

    cb(similarAds);
  });
};

// Фильтрация объявлений по цене

const setChangePrice = (arr, cb) => {

  housingPriceInput.addEventListener('change', (evt) => {
    clearLayers();

    const price = evt.target.value;
    let similarAds;

    if (price === 'any') {
      similarAds = arr;
    } else {
      const getFilteredAds = (arr) => {
        return arr.filter((obj) => {
          if (price === 'low') {
            return obj.offer.price < 10000;
          } else if (price === 'high') {
            return obj.offer.price > 50000;
          } else if (price === 'middle') {
            return obj.offer.price > 10000 && obj.offer.price < 50000;
          }
        });
      };
      similarAds = getFilteredAds(arr);
    }

    cb(similarAds);
  });
};

// Фильтрация объявлений по количеству комнат

const setChangeRooms = (arr, cb) => {

  housingRoomsInput.addEventListener('change', (evt) => {
    clearLayers();

    const rooms = evt.target.value;
    let similarAds;

    if (rooms === 'any') {
      similarAds = arr;
    } else {
      const getFilteredAds = (arr) => {
        return arr.filter((obj) => {
          return obj.offer.rooms == rooms;
        });
      };
      similarAds = getFilteredAds(arr);
    }

    cb(similarAds);
  });
};

// Фильтрация объявлений по количеству гостей

const setChangeGuests = (arr, cb) => {

  housingGuestsInput.addEventListener('change', (evt) => {
    clearLayers();

    const guests = evt.target.value;
    let similarAds;

    if (guests === 'any') {
      similarAds = arr;
    } else {
      const getFilteredAds = (arr) => {
        return arr.filter((obj) => {
          return obj.offer.guests == guests;
        });
      };
      similarAds = getFilteredAds(arr);
    }

    cb(similarAds);
  });
};

// Фильтрация объявлений по удобствам

const setClickFeatures = (arr, cb) => {

  housingFeatures.addEventListener('click', (evt) => {

    if (evt.target.matches('input[type="checkbox"]')) {
      clearLayers();

      let similarAds = arr;
      for (let i = 0; i < mapFeatures.length; i++) {

        if (mapFeatures[i].checked) {
          const featureFilter = mapFeatures[i].value;

          similarAds = similarAds.filter((obj) => {

            if(obj.offer.features) {
              return obj.offer.features.find((feature)=> {
                return feature === featureFilter;
              });
            }
          });
        }
      }
      cb(similarAds);
    }
  });
};

getData((ads) => {

  renderAdPins(ads.slice(0, SIMILAR_AD_COUNT)),
  setChangeType(ads, debounce(
    (similarAds) => renderAdPins(similarAds.slice(0, SIMILAR_AD_COUNT))
  ));
  setChangePrice(ads, debounce(
    (similarAds) => renderAdPins(similarAds.slice(0, SIMILAR_AD_COUNT))
  ));
  setChangeRooms(ads, debounce(
    (similarAds) => renderAdPins(similarAds.slice(0, SIMILAR_AD_COUNT))
  ));
  setChangeGuests(ads, debounce(
    (similarAds) => renderAdPins(similarAds.slice(0, SIMILAR_AD_COUNT))
  ));
  setClickFeatures(ads, debounce(
    (similarAds) => renderAdPins(similarAds.slice(0, SIMILAR_AD_COUNT))
  ));
});
