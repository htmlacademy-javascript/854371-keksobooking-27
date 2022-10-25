import {showAlert} from './utils.js';

const getData = (onSuccess) => {
  fetch('https://27.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch(() => {
      showAlert('Не получилось загрузить объяления, попробуйте обновить страницу.');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch('https://27.javascript.pages.academy/keksobooking', {
    method: 'POST',
    body: body
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
