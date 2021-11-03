//Модуль для генерации разметки объявления

const typeName = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

// Создаем разметку объявления

const similarAdTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const getPhotoList = async (photosArr, element) => {
  const elementPhotos = element.querySelector('.popup__photos');
  const elementPhoto = element.querySelector('.popup__photo');

  if (photosArr) {
    elementPhotos.innerHTML = '';

    photosArr.forEach((photo) => {
      const elementPhotosItem = elementPhoto.cloneNode(true);
      elementPhotosItem.src = photo;
      elementPhotos.appendChild(elementPhotosItem);
    });

  } else {
    elementPhotos.classList.add('hidden');
  }
};

const getFeaturesList = async (featuresArr, element) => {

  if (featuresArr) {
    element.querySelectorAll('.popup__feature').forEach((featuresItem) => {
      const isNecessary = featuresArr.some(
        (similarFeature) => featuresItem.classList.contains(`popup__feature--${similarFeature}`),
      );

      if (!isNecessary) {
        featuresItem.remove();
      }
    });

  } else {
    element.querySelector('.popup__features').classList.add('hidden');
  }
};

const getAdElement = (obj) => {
  const adElement = similarAdTemplate.cloneNode(true);

  adElement.querySelector('.popup__avatar').src = obj.author.avatar;
  adElement.querySelector('.popup__title').textContent = obj.offer.title;
  adElement.querySelector('.popup__text--address').textContent = obj.offer.address;
  adElement.querySelector('.popup__text--price').textContent = `${obj.offer.price} ₽/ночь`;
  adElement.querySelector('.popup__type').textContent = typeName[obj.offer.type];
  adElement.querySelector('.popup__text--capacity').textContent = `${obj.offer.rooms} комнаты для ${obj.offer.guests} гостей`;
  adElement.querySelector('.popup__text--time').textContent = `Заезд после ${obj.offer.checkin}, выезд до ${obj.offer.checkout}`;
  getFeaturesList(obj.offer.features, adElement);
  adElement.querySelector('.popup__description').textContent = obj.offer.description;
  getPhotoList(obj.offer.photos, adElement);

  adElement.childNodes.forEach((data, classOfElement) => {
    if(data === undefined) {
      adElement.querySelector(classOfElement).classList.add('hidden');
    }
  });

  return adElement;
};

export {getAdElement};
