import { sendData } from './api.js';
import { showMessageSuccess, showMessageError } from './message.js';
import { DEFAULT_LAT, DEFAULT_LNG, clearPinsLayer, setDefaultLocation } from './map.js';
import { clearAvatarPreview, clearPhotoPreview } from './preview.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const pricePlaceholder = '1000';

const typeMinPrice = {
  palace: '10000',
  flat: '1000',
  house: '5000',
  bungalow: '0',
  hotel: '3000',
};

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const addressInput = adForm.querySelector('#address');
const rooms = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const titleInput = adForm.querySelector('#title');
const priceInput = adForm.querySelector('#price');
const type = adForm.querySelector('#type');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const resetButton = adForm.querySelector('.ad-form__reset');

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

const setPricePlaceholder = (price) => {
  priceInput.setAttribute('placeholder', price);
};

const setSubmitForm = (cb) => {

  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => {
        showMessageSuccess();
        adForm.reset();
        mapFilters.reset();
        clearPhotoPreview();
        clearAvatarPreview();
        setDefaultLocation();
        setPricePlaceholder(pricePlaceholder);
        clearPinsLayer();
        cb();
      },
      () => showMessageError(),
      new FormData(evt.target),
    );
  });
};

const setClickReset = (cb) => {

  resetButton.addEventListener('click', () =>{
    mapFilters.reset();
    clearPhotoPreview();
    clearAvatarPreview();
    setDefaultLocation();
    setPricePlaceholder(pricePlaceholder);
    clearPinsLayer();
    cb();
  });
};

capacity.addEventListener('change', onChangeOption);
rooms.addEventListener('change', onChangeOption);

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

type.addEventListener('change', () => {
  const typeValue = type.options[type.selectedIndex].value;
  const minPrice = typeMinPrice[typeValue];

  setPricePlaceholder(minPrice);
  priceInput.setAttribute('min', minPrice);
});

timeIn.addEventListener('change', (evt) => {
  timeOut.value = evt.target.value;
});

timeOut.addEventListener('change', (evt) => {
  timeIn.value = evt.target.value;
});

addressInput.setAttribute('value', `${DEFAULT_LAT}, ${DEFAULT_LNG}`);

export { setSubmitForm, setClickReset };
