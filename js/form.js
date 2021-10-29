//Модуль для работы с полями формы

//Валидация поля с заголовком
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const titleInput = document.querySelector('#title');

const titleValidity = titleInput.addEventListener('input', () => {
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

const MAX_PRICE = 1000000;

const priceInput = document.querySelector('#price');

const priceValidity = priceInput.addEventListener('input', () => {
  const price = priceInput.value;

  if (price > MAX_PRICE) {
    priceInput.setCustomValidity(`Цена не должна превышать ${ MAX_PRICE }`);
  } else {
    priceInput.setCustomValidity('');
  }

  priceInput.reportValidity();
});

//Валидация поля с количеством гостей

const rooms = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');

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

const capacityValidity = capacity.addEventListener('change', selectValidity);
const roomsValidity = rooms.addEventListener('change', selectValidity);


// Проверка всех полей перед отправкой формы

const formValidity = () => {
  titleValidity();
  priceValidity();
  capacityValidity();
  roomsValidity();
};

const form = document.querySelector('.ad-form');

form.addEventListener('submit', (evt) => {

  if(!formValidity) {
    evt.preventDefault();
  }

});
