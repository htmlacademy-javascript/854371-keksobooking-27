import {sendData} from './api.js';

import {
  AVATAR_PREVIEW_SRC_DEFAULT,
  COORDINATES_MAIN_PIN,
  HOUSE_PREVIEW_COLOR_DEFAULT
} from './contants.js';

import {
  adFormElement,
  mapFiltersElement,
  submitButtonFormElement,
  resetButtonFormElement,
  addressElement
} from './form.js';

import {resetMap} from './map.js';

import {
  avatarPreviewElement,
  housePreviewElement
} from './preview.js';

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
  adFormElement.reset();
  mapFiltersElement.reset();
  resetMap();
  addressElement.value = `${COORDINATES_MAIN_PIN.lat}, ${COORDINATES_MAIN_PIN.lng}`;
  avatarPreviewElement.src = AVATAR_PREVIEW_SRC_DEFAULT;
  housePreviewElement.style.background = HOUSE_PREVIEW_COLOR_DEFAULT;
};

const onSuccess = () => {
  submitButtonFormElement.disabled = false;
  submitButtonFormElement.textContent = 'Опубликовать';
  document.body.insertAdjacentElement('beforeend', popupOnSuccess);
  const popupOnSuccessElement = document.querySelector('.success');
  document.addEventListener('keydown', onPopupSuccessEscDown, {once: true});
  popupOnSuccessElement.addEventListener('click', onPopupSuccessClick);
  resetForm();
};

const onFail = () => {
  submitButtonFormElement.disabled = false;
  submitButtonFormElement.textContent = 'Опубликовать';
  document.body.insertAdjacentElement('beforeend', popupOnError);
  const popupOnErrorElement = document.querySelector('.error');
  document.addEventListener('keydown', onPopupErrorEscDown, {once: true});
  popupOnErrorElement.addEventListener('click', onPopupErrorEscClick);
};

adFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    submitButtonFormElement.disabled = true;
    submitButtonFormElement.textContent = 'Публикуем ...';
    const formData = new FormData(adFormElement);
    sendData(onSuccess, onFail, formData);
  }
});

resetButtonFormElement.addEventListener('click', resetForm);
