//Модуль фильтрации объявлений

import { renderAdPins, clearPinsLayer } from './map.js';
import { debounce } from './utils/debounce.js';

const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const housingFeatures = document.getElementsByName('features');

//Функция, возвращающая условие для фильтра по типу жилья

const filterHousingType = (ad) => {
  const filterValue = housingType.value;
  if (filterValue === 'any' ) {
    return true;
  }
  return ad.offer.type === filterValue;
};

//Функция, возвращающая условие для фильтра по цене

const filterHousingPrice = (ad) => {
  const filterValue = housingPrice.value;

  if (filterValue === 'any' ||
    filterValue === 'low' && ad.offer.price < 10000 ||
    filterValue === 'high' && ad.offer.price > 50000  ||
    filterValue ===  'middle' && ad.offer.price > 10000 && ad.offer.price < 50000) {
    return true;
  }
};

//Функция, возвращающая условие для фильтра по количеству комнат

const filterHousingRooms = (ad) => {
  const filterValue = housingRooms.value;
  if (filterValue === 'any' ) {
    return true;
  }
  return ad.offer.rooms === Number(filterValue);
};

//Функция, возвращающая условие для фильтра по количеству гостей

const filterHousingGuests = (ad) => {
  const filterValue = housingGuests.value;
  if (filterValue === 'any' ) {
    return true;
  }
  return ad.offer.guests === Number(filterValue);
};

//Функция, возвращающая условие для фильтра по удобствам

const filterHousingFeatures = (ad) => Array.from(housingFeatures)
  .every((checkbox) => {
    if (!checkbox.checked) {
      return true;
    }
    if (!ad.offer.features) {
      return false;
    }
    return ad.offer.features.includes(checkbox.value);
  });

//Функция для фильтрации по всем условиям

const getFilteredAds = (ads) => {
  const filteredAds = [];

  for (let i = 0; i < ads.length; i++) {
    const ad = ads[i];
    if (
      filterHousingType(ad) &&
      filterHousingPrice(ad) &&
      filterHousingRooms(ad) &&
      filterHousingGuests(ad) &&
      filterHousingFeatures(ad)
    ) {
      filteredAds.push(ad);
    }
  }
  return filteredAds;
};

//Функция на изменение фильтров

const onFilterChange = debounce((ads) => {
  const newAds = getFilteredAds(ads);
  clearPinsLayer();
  renderAdPins(newAds);
});

export { onFilterChange, mapFilters };
