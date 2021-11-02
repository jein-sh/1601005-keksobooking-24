//Модуль для работы с сервером

import  {showMessage, showAlert} from './message.js';

const adForm = document.querySelector('.ad-form');
const success = document.querySelector('#success')
  .content
  .querySelector('.success');

const error = document.querySelector('#error')
  .content
  .querySelector('.error');

const getData = (onSuccess) => {
  fetch('https://24.javascript.pages.academy/keksobooking/dat1a')
    .then((response) => {
      if (response.ok) {
        response.json()
          .then((ads) => {
            onSuccess(ads);
          });
      } else {
        throw new Error('Произошла ошибка загрузки объявлений с сервера');
      }
    })
    .catch((err) => {
      showAlert(err);
    });
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  fetch(
    'https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: new FormData(adForm),
    },
  )
    .then((response) => {
      if (response.ok) {
        showMessage(success);
        adForm.reset();
      } else {
        showMessage(error);
      }
    })
    .catch(() => {
      showMessage(error);
    });
});

export {getData};
