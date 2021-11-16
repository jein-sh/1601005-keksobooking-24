import { renderAdPins, clearPinsLayer } from './map.js';
import { debounce } from './utils/debounce.js';

const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const housingFeatures = document.getElementsByName('features');

const filterHousingType = (ad) => {
  const filterValue = housingType.value;
  if (filterValue === 'any' ) {
    return true;
  }
  return ad.offer.type === filterValue;
};

const filterHousingPrice = (ad) => {
  const filterValue = housingPrice.value;

  if (filterValue === 'any' ||
    filterValue === 'low' && ad.offer.price < 10000 ||
    filterValue === 'high' && ad.offer.price > 50000  ||
    filterValue ===  'middle' && ad.offer.price > 10000 && ad.offer.price < 50000) {
    return true;
  }
};

const filterHousingRooms = (ad) => {
  const filterValue = housingRooms.value;
  if (filterValue === 'any' ) {
    return true;
  }
  return ad.offer.rooms === Number(filterValue);
};

const filterHousingGuests = (ad) => {
  const filterValue = housingGuests.value;
  if (filterValue === 'any' ) {
    return true;
  }
  return ad.offer.guests === Number(filterValue);
};

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

const onFilterChange = debounce((ads) => {
  const newAds = getFilteredAds(ads);
  clearPinsLayer();
  renderAdPins(newAds);
});

export { onFilterChange, mapFilters };
