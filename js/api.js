import  { showAlert, messageErorData } from './message.js';

const urlApp = 'https://27.javascript.pages.academy/keksobooking';
const urlAppData = 'https://27.javascript.pages.academy/keksobooking/data';

const getData = (onSuccess) => {
  fetch(urlAppData)
    .then((response) => {
      if (response.ok) {
        response.json()
          .then((ads) => {
            onSuccess(ads);
          });
      } else {
        throw new Error(messageErorData);
      }
    })
    .catch((err) => {
      showAlert(err);
    });
};

const sendData = (onSuccess, onError, body) => {

  fetch(
    urlApp,
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

export { getData, sendData };
