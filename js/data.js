//Модуль, который создает данные

import {getRandomFromRange, getRandomFloatFromRange, getRandomLengthArray, getRandomArrayElement} from './util.js';

const USER_NUMBER = [
  '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
];

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const typeName = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

export {typeName};

const typeMinPrice = {
  palace: '10000',
  flat: '1000',
  house: '5000',
  bungalow: '0',
  hotel: '3000',
};

export {typeMinPrice};

const CHECK_IN_OUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditione',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const DESCRIPTION_LIST = [
  'лучшие апартаменты в самом центре города',
  'в шаговой доступности все главные достопримечательности',
  'хороший вид из окна',
  'бесплатный Wi-Fi',
  'вкусный завтрак',
];

const SIMILAR_ADS_COUNT = 10;

const createAutor = () => `img/avatars/user${USER_NUMBER.splice(0, 1)[0]}.png`;

const getLocation = () => (
  {
    lat: getRandomFloatFromRange(35.65000, 35.70000, 5),
    lng: getRandomFloatFromRange(139.70000, 139.80000, 5),
  }
);

const locationRandom = getLocation();

const createOffer = () => (
  {
    title: 'Уютное жилье в центре Токио',
    address: `${locationRandom.lat}, ${locationRandom.lng}`,
    price: getRandomFromRange(5000, 100000),
    type: getRandomArrayElement(TYPE),
    rooms: getRandomFromRange(1, 5),
    guests: getRandomFromRange(1, 5),
    checkin: getRandomArrayElement(CHECK_IN_OUT),
    checkout: getRandomArrayElement(CHECK_IN_OUT),
    features: getRandomLengthArray(FEATURES),
    description: getRandomLengthArray(DESCRIPTION_LIST).join(),
    photos: getRandomLengthArray(PHOTOS),
  }
);

const createAd = () => (
  {
    autor: createAutor(),
    offer: createOffer(),
    location: getLocation(),
  }
);

export {createAd};

const createAds = () => Array.from(
  {length: SIMILAR_ADS_COUNT},
  createAd,
);

export {createAds};
