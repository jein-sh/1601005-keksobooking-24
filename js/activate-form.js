const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('.ad-form__element');

const mapFilters = document.querySelector('.map__filters');
const mapFilter = mapFilters.querySelectorAll('.map__filter');
const mapFeatures = mapFilters.querySelector('.map__features');

const getAttributeDisabled = (element) => {
  element.setAttribute('disabled', 'disabled');
};

const disableForm = () => {
  adForm.classList.add('ad-form--disabled');
  adFormElements.forEach(getAttributeDisabled);

  mapFilters.classList.add('map__filters--disabled');
  mapFilter.forEach(getAttributeDisabled);
  getAttributeDisabled(mapFeatures);
};

disableForm();

const removeAttributeDisabled = (element) => {
  element.removeAttribute('disabled');
};

const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormElements.forEach(removeAttributeDisabled);

  mapFilters.classList.remove('map__filters--disabled');
  mapFilter.forEach(removeAttributeDisabled);
  removeAttributeDisabled(mapFeatures);
};

export { activateForm };
