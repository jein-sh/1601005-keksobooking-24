//Модуль для генерации разметки объявления

import {createAd, createAds, typeName} from './data.js';

// Создаем разметку объявления

const similarAdTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const similarAd = createAd();

const similarAds = createAds;

const similarListFragment = document.createDocumentFragment();

const adElement = similarAdTemplate.cloneNode(true);

const getPhotoList = (photosArr) => {
  const adPhotos = adElement.querySelector('.popup__photos');
  const adPhoto = adElement.querySelector('.popup__photo');

  adPhotos.innerHTML = '';

  photosArr.forEach((photo) => {
    const adPhotosItem = adPhoto.cloneNode(true);
    adPhotosItem.src = photo;
    adPhotos.appendChild(adPhotosItem);
  });
};

const getFeaturesList = (featuresArr) => {
  adElement.querySelectorAll('.popup__feature').forEach((featuresItem) => {
    const isNecessary = featuresArr.some(
      (similarFeature) => featuresItem.classList.contains(`popup__feature--${similarFeature}`),
    );

    if (!isNecessary) {
      featuresItem.remove();
    }
  });
};

const getAdElement = (obj) => {

  adElement.querySelector('.popup__avatar').src = obj.autor;
  adElement.querySelector('.popup__title').textContent = obj.offer.title;
  adElement.querySelector('.popup__text--address').textContent = obj.offer.address;
  adElement.querySelector('.popup__text--price').textContent = `${obj.offer.price} ₽/ночь`;
  adElement.querySelector('.popup__type').textContent = typeName[obj.offer.type];
  adElement.querySelector('.popup__text--capacity').textContent = `${obj.offer.rooms} комнаты для ${obj.offer.guests} гостей`;
  adElement.querySelector('.popup__text--time').textContent = `Заезд после ${obj.offer.checkin}, выезд до ${obj.offer.checkout}`;
  getFeaturesList(obj.offer.features);
  adElement.querySelector('.popup__description').textContent = obj.offer.description;
  getPhotoList(obj.offer.photos);

  adElement.childNodes.forEach((data, classOfElement) => {
    if(data === undefined) {
      adElement.querySelector(classOfElement).classList.add('hidden');
    }
  });

  return adElement;
};

// рендерим одно объявление

const mapCanvas = document.querySelector('#map-canvas');

mapCanvas.appendChild(getAdElement(similarAd));

// рендерим все объявления

similarAds.forEach(() => {

  getAdElement();

  similarListFragment.appendChild(adElement);
});
