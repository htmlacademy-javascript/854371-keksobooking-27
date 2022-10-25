import {sendData} from './api.js';

import {
  adForm,
  mapFilters,
  submitButtonForm
} from './form.js';

import {
  MAXIMUM_GUEST_ROOMS,
  VALUE_OPTION_NOT_FOR_GUESTS,
  REGISTRATION_HOURS
} from './contants.js';
import {isEscape} from './utils.js';

const minPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000
};

const pristineConfig = {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'text-help'
};
const pristine = new Pristine(adForm, pristineConfig);
const kindType = adForm.querySelector('#type');
const price = adForm.querySelector('#price');

/**
 * Функция для валидации цены
 * @param value значение поля с ценой
 * @return {boolean} если поле невалидно, вернет false
 */
const validatePrice = (value) => value >= minPrice[kindType.value];

/**
 * Функция для генерации сообщения, которое будет выведено пользователю, на случай если validatePrice вернет false
 * @return {string}
 */
const getPriceErrorMessage = () => `Цена за ${kindType.options[kindType.selectedIndex].text} должна быть не меньше ${minPrice[kindType.value]} &#8381;`;

function onPriceChange() {
  price.placeholder = minPrice[this.value];
  price.min = minPrice[this.value];
  pristine.validate(price);
}

kindType.addEventListener('change', onPriceChange);
pristine.addValidator(price, validatePrice, getPriceErrorMessage);

const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');

/**
 * Валидирует колличество комнат, возвращает false если колличество не соответствует требованиям
 * @param value колличество комнат выбранное в select
 * @return {boolean}
 */
const validateRoomNumber = (value) => {
  if (value > MAXIMUM_GUEST_ROOMS && +capacity.value !== VALUE_OPTION_NOT_FOR_GUESTS) {
    return false;
  }
  return value >= capacity.value;
};

/**
 * Генерирует сообщение для пользователя, если валидация колличество комнат вернула false
 * @param value колличество комнат выбранное в select
 * @return {string} сообщение для пользователя
 */
const getRoomNumberErrorMessage = (value) => {
  if (value > MAXIMUM_GUEST_ROOMS) {
    return 'Больше трех комнат точно не для гостей';
  }
  return `${capacity.options[capacity.selectedIndex].text} должно быть доступно минимум ${roomNumber.options[(capacity.value - 1)].text}`;
};

/**
 * Валидирует колличество мест, возвращает false если колличество не соответствует требованиям
 * @param value колличество мест выбранное в select
 * @return {boolean}
 */
const validateCapacity = (value) => !(+value === VALUE_OPTION_NOT_FOR_GUESTS && +roomNumber.value <= MAXIMUM_GUEST_ROOMS);

const onRoomNumberChange = () => {
  pristine.validate(roomNumber);
  pristine.validate(capacity);
};

const onCapacityChange = () => {
  pristine.validate(roomNumber);
  pristine.validate(capacity);
};

roomNumber.addEventListener('change', onRoomNumberChange);
capacity.addEventListener('change', onCapacityChange);
pristine.addValidator(roomNumber, validateRoomNumber, getRoomNumberErrorMessage);
pristine.addValidator(capacity, validateCapacity, 'Для не гостей должно быть больше 3-х комнат');

const formElementTime = adForm.querySelector('.ad-form__element--time');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const updateTimeInOut = (evt) => {
  const element = evt.target;
  if (element.id === 'timein') {
    switch (element.value) {
      case REGISTRATION_HOURS[0]:
        timeOut.value = REGISTRATION_HOURS[0];
        break;
      case REGISTRATION_HOURS[1]:
        timeOut.value = REGISTRATION_HOURS[1];
        break;
      case REGISTRATION_HOURS[2]:
        timeOut.value = REGISTRATION_HOURS[2];
        break;
    }
  }
  if (element.id === 'timeout') {
    switch (element.value) {
      case REGISTRATION_HOURS[0]:
        timeIn.value = REGISTRATION_HOURS[0];
        break;
      case REGISTRATION_HOURS[1]:
        timeIn.value = REGISTRATION_HOURS[1];
        break;
      case REGISTRATION_HOURS[2]:
        timeIn.value = REGISTRATION_HOURS[2];
        break;
    }
  }
};

formElementTime.addEventListener('change', updateTimeInOut);

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

const onSuccess = () => {
  submitButtonForm.disabled = false;
  submitButtonForm.textContent = 'Опубликовать';
  document.body.insertAdjacentElement('beforeend', popupOnSuccess);
  const popupOnSuccessElement = document.querySelector('.success');
  document.addEventListener('keydown', onPopupSuccessEscDown);
  popupOnSuccessElement.addEventListener('click', onPopupSuccessClick);

  adForm.reset();
  mapFilters.reset();
};

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

export {
  price,
  kindType,
  minPrice
};
