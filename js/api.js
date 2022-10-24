import {showAlert} from './utils.js';

const getData = (onSuccess) => {
  fetch('https://27.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch((err) => {
      showAlert(err);
    });
};

export {getData};
