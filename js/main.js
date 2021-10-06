//Функция, возвращающая случайное целое положительное число из переданного диапазона включительно

function getRandomFromRange(min, max) {
  if (max > min && min >= 0 && max > 0) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }

  throw new RangeError('Ошибочные значения диапазона: первое значение должно быть меньше второго, а также диапазон может быть только положительный, включая ноль');
}

//Функция, возвращающая случайное положительное число с плавающей точкой из переданного диапазона включительно с указанным количеством знаков после запятой

function getRandomFloatFromRange(min, max, numOfDecimals) {
  if (max > min && min >= 0 && max > 0) {
    const randomFloat = Math.random() * (max + 1 - min) + min;
    return Math.floor(randomFloat * 10 ** numOfDecimals) / 10 ** numOfDecimals;
  }

  throw new RangeError('Ошибочные значения диапазона: первое значение должно быть меньше второго, а также диапазон может быть только положительный, включая ноль');
}

getRandomFromRange(0, 10);
getRandomFloatFromRange(0, 200, 5);

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

const getRandomArrayElement = (elements) => elements[getRandomFromRange(0, elements.length - 1)];

const getRandomLengthArray = (elements) => {
  const maxLength = elements.length;
  const lengthArray = getRandomFromRange(1, maxLength);
  const array = [];

  for (let i=0; i < lengthArray; i++) {
    const element = elements[getRandomFromRange(0, maxLength - 1)];

    if (!array.includes(element)) {
      array.push(element);
    }
  }
  return array;
};

const createAutor = () => `img/avatars/user ${USER_NUMBER.splice(0, 1)[0]} .png`;

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
    feauters: getRandomLengthArray(FEATURES),
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

const similarAds = Array.from(
  {length: SIMILAR_ADS_COUNT},
  createAd,
);

console.log(similarAds);
