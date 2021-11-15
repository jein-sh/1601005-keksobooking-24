// Модуль для работы с картой

import { activateForm } from './activate-form.js';
import { getAdElement } from './popup-card.js';

const DEFAULT_LAT = 35.68950;
const DEFAULT_LNG = 139.69171;
const SIMILAR_AD_COUNT = 10;

export { DEFAULT_LAT, DEFAULT_LNG };

const adForm = document.querySelector('.ad-form');
const addressInput = adForm.querySelector('#address');

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

//Функция которая возвращает главный маркер на исходную позицию

const setDefaultLocation = () => {
  mainPinMarker.setLatLng({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  });
};

export { setDefaultLocation };

//создание группы маркеров объявлений на отдельном слое

const markerGroup = L.layerGroup().addTo(map);

const renderAdPins = (ads) => {

  const similarAds = ads.slice(0, SIMILAR_AD_COUNT);

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
      .addTo(markerGroup)
      .bindPopup(getAdElement(similarAd));
  });

};

//Функця которая очищает слой с маркерами и скрывает балун

const clearPinsLayer = () => {
  markerGroup.clearLayers();
};

export { renderAdPins, clearPinsLayer };
