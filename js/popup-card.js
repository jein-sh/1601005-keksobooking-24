//Модуль для генерации разметки объявления

import {createAds, getTypeName} from './data.js';

const similarAdTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const similarAds = createAds;

const similarListFragment = document.createDocumentFragment();

similarAds.forEach(({autor, offer}) => {
  const adElement = similarAdTemplate.cloneNode(true);

  adElement.querySelector('.popup__avatar').src = autor;

  adElement.querySelector('.popup__title').textContent = offer.title;
  adElement.querySelector('.popup__text--address').textContent = offer.address;
  adElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  adElement.querySelector('.popup__type').textContent = getTypeName(offer.type);
  adElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  adElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  adElement.querySelectorAll('.popup__feature').forEach((featuresItem) => {
    const isNecessary = offer.features.some(
      (similarFeature) => featuresItem.classList.contains(`popup__feature--${similarFeature}`),
    );

    if (!isNecessary) {
      featuresItem.remove();
    }
  });

  adElement.querySelector('.popup__description').textContent = offer.description;

  const adPhotos = adElement.querySelector('.popup__photos');
  const adPhoto = adElement.querySelector('.popup__photo');

  adPhotos.innerHTML = '';

  offer.photos.forEach((photo) => {
    const adPhotosItem = adPhoto.cloneNode(true);
    adPhotosItem.src = photo;
    adPhotos.appendChild(adPhotosItem);
  });

  adElement.childNodes.forEach((data, classOfElement) => {
    if(data === undefined) {
      adElement.querySelector(classOfElement).classList.add('hidden');
    }
  });

  similarListFragment.appendChild(adElement);
});

const mapCanvas = document.querySelector('#map-canvas');

mapCanvas.appendChild(similarListFragment.firstChild);
