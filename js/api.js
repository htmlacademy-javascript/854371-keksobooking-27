import {
  DATA_RECEIVING_ADDRESS,
  DATA_SENDING_ADDRESS
} from './contants.js';

import {showAlert} from './utils.js';

const getData = (onSuccess) => {
  fetch(DATA_RECEIVING_ADDRESS)
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch(() => {
      showAlert('Не получилось загрузить объяления, попробуйте обновить страницу.');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(DATA_SENDING_ADDRESS, {
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
