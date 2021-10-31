//Модуль для работы с полями формы
import {typeMinPrice} from './data.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const adForm = document.querySelector('.ad-form');
const rooms = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const titleInput = adForm.querySelector('#title');
const priceInput = adForm.querySelector('#price');
const type = adForm.querySelector('#type');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

//Валидация поля с количеством гостей

const selectValidity = () => {
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

selectValidity();

capacity.addEventListener('change', selectValidity);
rooms.addEventListener('change', selectValidity);

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

timeIn.addEventListener('change', () => {
  const time = timeIn.options[timeIn.selectedIndex].value;

  for (let i=0; i < timeOut.options.length; i++) {
    timeOut.options[i].removeAttribute('selected', 'selected');

    if (timeOut.options[i].value === time) {
      timeOut.options[i].setAttribute('selected', 'selected');
    }
  }
});

timeOut.addEventListener('change', () => {
  const time = timeOut.options[timeOut.selectedIndex].value;

  for (let i=0; i < timeIn.options.length; i++) {
    timeIn.options[i].removeAttribute('selected', 'selected');

    if (timeIn.options[i].value === time) {
      timeIn.options[i].setAttribute('selected', 'selected');
    }
  }
});
