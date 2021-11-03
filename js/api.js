//Модуль для работы с сервером

import  {showAlert} from './message.js';

const getData = (onSuccess) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
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

const sendData = (onSuccess, onError, body) => {

  fetch(
    'https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
};

export {getData, sendData};
