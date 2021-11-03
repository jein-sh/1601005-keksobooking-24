//Модуль для работы с полями формы

import { sendData } from './api.js';
import { showMessageSuccess, showMessageError } from './message.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const typeMinPrice = {
  palace: '10000',
  flat: '1000',
  house: '5000',
  bungalow: '0',
  hotel: '3000',
};

const adForm = document.querySelector('.ad-form');
const rooms = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const titleInput = adForm.querySelector('#title');
const priceInput = adForm.querySelector('#price');
const type = adForm.querySelector('#type');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

//Валидация поля с количеством гостей

const onChangeOption = () => {
  const roomsValue = rooms.options[rooms.selectedIndex].value;
  const capacityValue = capacity.options[capacity.selectedIndex].value;
  if (capacityValue === '0' && roomsValue !== '100') {
    capacity.setCustomValidity('Укажите количество гостей');
  }else if (roomsValue === '100' && capacityValue !== '0') {
    capacity.setCustomValidity('Выбранное количество комнат не предназначено для гостей');
  }else if(roomsValue < capacityValue) {
    capacity.setCustomValidity('К сожалению выбранное количество гостей не разместить в выбранном количестве комнат');
  }else {
    capacity.setCustomValidity('');
  }
};

capacity.addEventListener('change', onChangeOption);
rooms.addEventListener('change', onChangeOption);

//Валидация поля с заголовком

titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Ещё ${ MIN_TITLE_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${ valueLength - MAX_TITLE_LENGTH } симв.`);
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});

//Валидация поля с ценой

type.addEventListener('change', () => {
  const typeValue = type.options[type.selectedIndex].value;
  const minPrice = typeMinPrice[typeValue];

  priceInput.setAttribute('placeholder', minPrice);
  priceInput.setAttribute('min', minPrice);
});

//Соотношение полей с временем заезда/выезда

timeIn.addEventListener('change', (evt) => {
  timeOut.value = evt.target.value;
});

timeOut.addEventListener('change', (evt) => {
  timeIn.value = evt.target.value;
});

//Обработка отправки формы

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  sendData(
    () => {
      showMessageSuccess();
      adForm.reset();
    },
    () => showMessageError(),
    new FormData(evt.target),
  );
});
