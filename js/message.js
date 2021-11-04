//Модуль для создания сообщений об загрузке/отправке данных

const ALERT_SHOW_TIME = 5000;

const body = document.querySelector('body');
const fragment = document.createDocumentFragment();
const success = document.querySelector('#success')
  .content
  .querySelector('.success');

const error = document.querySelector('#error')
  .content
  .querySelector('.error');

const closeMessage = () => {
  const messageSuccess = document.querySelector('.success');
  const messageError = document.querySelector('.error');

  if (messageSuccess) {
    messageSuccess.remove();
  }

  if (messageError) {
    messageError.remove();
  }
};

const onEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeMessage();
    document.removeEventListener('keydown', onEscKeydown);
  }
};

const onMessageClick = (evt) => {
  evt.preventDefault();
  closeMessage();
  document.removeEventListener('click', onMessageClick);
};

const showMessage = (messageTemplate) => {
  const message = messageTemplate.cloneNode(true);

  fragment.appendChild(message);
  body.appendChild(fragment);

  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onMessageClick);
};

const showMessageSuccess = () => {
  showMessage(success);
};
const showMessageError = () => {
  showMessage(error);
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.right = 0;
  alertContainer.style.top = 0;
  alertContainer.style.color = 'white';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {showMessageSuccess, showMessageError, showAlert};
