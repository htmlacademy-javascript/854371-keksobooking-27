import {sendData} from './api.js';

import {
  adForm,
  mapFilters,
  submitButtonForm,
  resetButtonForm
} from './form.js';

import {resetMap} from './map.js';
import {isEscape} from './utils.js';
import {pristine} from './validate-form.js';

const popupOnSuccess = document.querySelector('#success').content
  .querySelector('.success').cloneNode(true);
const popupOnError = document.querySelector('#error').content
  .querySelector('.error').cloneNode(true);

function onPopupSuccessClick () {
  popupOnSuccess.remove();
}

function onPopupSuccessEscDown (evt) {
  if (isEscape(evt)) {
    popupOnSuccess.remove();
  }
}

function onPopupErrorEscClick () {
  popupOnError.remove();
}

function onPopupErrorEscDown (evt) {
  if (isEscape(evt)) {
    popupOnError.remove();
  }
}

const resetForm = () => {
  adForm.reset();
  mapFilters.reset();
  resetMap();
};

const onSuccess = () => {
  submitButtonForm.disabled = false;
  submitButtonForm.textContent = 'Опубликовать';
  document.body.insertAdjacentElement('beforeend', popupOnSuccess);
  const popupOnSuccessElement = document.querySelector('.success');
  document.addEventListener('keydown', onPopupSuccessEscDown);
  popupOnSuccessElement.addEventListener('click', onPopupSuccessClick);
  resetForm();
};

setTimeout(() => {
  onSuccess();
}, 7000);

const onFail = () => {
  submitButtonForm.disabled = false;
  submitButtonForm.textContent = 'Опубликовать';
  document.body.insertAdjacentElement('beforeend', popupOnError);
  const popupOnErrorElement = document.querySelector('.error');
  document.addEventListener('keydown', onPopupErrorEscDown);
  popupOnErrorElement.addEventListener('click', onPopupErrorEscClick);
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    submitButtonForm.disabled = true;
    submitButtonForm.textContent = 'Публикуем ...';
    const formData = new FormData(adForm);
    sendData(onSuccess, onFail, formData);
  }
});

resetButtonForm.addEventListener('click', resetForm);
