import {sendData} from './api.js';

import {
  AVATAR_PREVIEW_SRC_DEFAULT,
  COORDINATES_MAIN_PIN,
  HOUSE_PREVIEW_COLOR_DEFAULT
} from './contants.js';

import {
  adForm,
  mapFilters,
  submitButtonForm,
  resetButtonForm,
  address
} from './form.js';

import {resetMap} from './map.js';

import {
  avatarPreview,
  housePreview
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
  adForm.reset();
  mapFilters.reset();
  resetMap();
  address.value = `${COORDINATES_MAIN_PIN.lat}, ${COORDINATES_MAIN_PIN.lng}`;
  avatarPreview.src = AVATAR_PREVIEW_SRC_DEFAULT;
  housePreview.style.background = HOUSE_PREVIEW_COLOR_DEFAULT;
};

const onSuccess = () => {
  submitButtonForm.disabled = false;
  submitButtonForm.textContent = 'Опубликовать';
  document.body.insertAdjacentElement('beforeend', popupOnSuccess);
  const popupOnSuccessElement = document.querySelector('.success');
  document.addEventListener('keydown', onPopupSuccessEscDown, {once: true});
  popupOnSuccessElement.addEventListener('click', onPopupSuccessClick);
  resetForm();
};

const onFail = () => {
  submitButtonForm.disabled = false;
  submitButtonForm.textContent = 'Опубликовать';
  document.body.insertAdjacentElement('beforeend', popupOnError);
  const popupOnErrorElement = document.querySelector('.error');
  document.addEventListener('keydown', onPopupErrorEscDown, {once: true});
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
