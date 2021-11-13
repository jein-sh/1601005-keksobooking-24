import './form.js';
import { onFilterChange, mapFilters } from './filter.js';
import { renderAdPins } from './map.js';
import './popup-card.js';
import { getData } from './api.js';
import './message.js';
import './filter.js';
import './preview.js';
import './activate-form.js';
import { setSubmitForm, setClickReset } from './form.js';

getData((ads) => {
  renderAdPins(ads);

  mapFilters.addEventListener('change', () => {
    onFilterChange(ads);
  });

  setSubmitForm(() => renderAdPins(ads));
  setClickReset(() => renderAdPins(ads));
});
