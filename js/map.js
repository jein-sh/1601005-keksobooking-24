// Модуль для работы с картой

import {getData} from './api.js';
import {getAdElement} from './popup-card.js';

// Перевод формы в неактивное состояние до загрузки карты

const DEFAULT_LAT = 35.68950;
const DEFAULT_LNG = 139.69171;

const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('.ad-form__element');

const mapFilters = document.querySelector('.map__filters');
const mapFilter = mapFilters.querySelectorAll('.map__filter');
const mapFeatures = mapFilters.querySelector('.map__features');

const addressInput = adForm.querySelector('#address');
addressInput.setAttribute('value', `${DEFAULT_LAT}, ${DEFAULT_LNG}`);

const getAttributeDisabled = (element) => {
  element.setAttribute('disabled', 'disabled');
};

const disabledForm = () => {
  adForm.classList.add('ad-form--disabled');
  adFormElements.forEach(getAttributeDisabled);

  mapFilters.classList.add('map__filters--disabled');
  mapFilter.forEach(getAttributeDisabled);
  getAttributeDisabled(mapFeatures);
};

disabledForm();

//Перевод формы в активное состояние после загрузки карты

const removeAttributeDisabled = (element) => {
  element.removeAttribute('disabled');
};

const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormElements.forEach(removeAttributeDisabled);

  mapFilters.classList.remove('map__filters--disabled');
  mapFilter.forEach(removeAttributeDisabled);
  removeAttributeDisabled(mapFeatures);
};

//создание слоя с картой

const map = L.map('map-canvas')
  .on('load', activateForm)
  .setView({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// создание главного маркера

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize:     [52, 52],
  iconAnchor:   [26, 52],

});

const mainPinMarker = L.marker(
  {
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  addressInput.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

//создание группы маркеров объявлений

const renderAdPins = (similarAds) => {

  similarAds.forEach((similarAd) => {

    const pinIcon = L.icon({
      iconUrl: '../img/pin.svg',
      iconSize:     [40, 40],
      iconAnchor:   [20, 40],

    });

    const pinMarker = L.marker({
      lat: similarAd.location.lat,
      lng: similarAd.location.lng,
    },
    {
      icon: pinIcon,
    });

    pinMarker
      .addTo(map)
      .bindPopup(getAdElement(similarAd));
  });

};

const SIMILAR_AD_COUNT = 10;

getData((ads) => {
  renderAdPins(ads.slice(0, SIMILAR_AD_COUNT));
});
