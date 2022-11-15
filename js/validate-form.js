import {
  adFormElement,
} from './form.js';

import {
  MAXIMUM_GUEST_ROOMS,
  VALUE_OPTION_NOT_FOR_GUESTS,
  REGISTRATION_HOURS
} from './contants.js';

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
const pristine = new Pristine(adFormElement, pristineConfig);
const kindTypeElement = adFormElement.querySelector('#type');
const priceElement = adFormElement.querySelector('#price');

/**
 * Функция для валидации цены
 * @param value значение поля с ценой
 * @return {boolean} если поле невалидно, вернет false
 */
const validatePrice = (value) => value >= minPrice[kindTypeElement.value];

/**
 * Функция для генерации сообщения, которое будет выведено пользователю, на случай если validatePrice вернет false
 * @return {string}
 */
const getPriceErrorMessage = () => `Цена за ${kindTypeElement.options[kindTypeElement.selectedIndex].text} должна быть не меньше ${minPrice[kindTypeElement.value]} &#8381;`;

function onPriceChange() {
  priceElement.placeholder = minPrice[this.value];
  priceElement.min = minPrice[this.value];
  pristine.validate(priceElement);
}

kindTypeElement.addEventListener('change', onPriceChange);
pristine.addValidator(priceElement, validatePrice, getPriceErrorMessage);

const roomNumberElement = adFormElement.querySelector('#room_number');
const capacityElement = adFormElement.querySelector('#capacity');

/**
 * Валидирует колличество комнат, возвращает false если колличество не соответствует требованиям
 * @param value колличество комнат выбранное в select
 * @return {boolean}
 */
const validateRoomNumber = (value) => {
  if (value > MAXIMUM_GUEST_ROOMS && +capacityElement.value !== VALUE_OPTION_NOT_FOR_GUESTS) {
    return false;
  }
  return value >= capacityElement.value;
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
  return `${capacityElement.options[capacityElement.selectedIndex].text} должно быть доступно минимум ${roomNumberElement.options[(capacityElement.value - 1)].text}`;
};

/**
 * Валидирует колличество мест, возвращает false если колличество не соответствует требованиям
 * @param value колличество мест выбранное в select
 * @return {boolean}
 */
const validateCapacity = (value) => !(+value === VALUE_OPTION_NOT_FOR_GUESTS && +roomNumberElement.value <= MAXIMUM_GUEST_ROOMS);

const onRoomNumberChange = () => {
  pristine.validate(roomNumberElement);
  pristine.validate(capacityElement);
};

const onCapacityChange = () => {
  pristine.validate(roomNumberElement);
  pristine.validate(capacityElement);
};

roomNumberElement.addEventListener('change', onRoomNumberChange);
capacityElement.addEventListener('change', onCapacityChange);
pristine.addValidator(roomNumberElement, validateRoomNumber, getRoomNumberErrorMessage);
pristine.addValidator(capacityElement, validateCapacity, 'Для не гостей должно быть больше 3-х комнат');

const formElementTime = adFormElement.querySelector('.ad-form__element--time');
const timeInElement = adFormElement.querySelector('#timein');
const timeOutElement = adFormElement.querySelector('#timeout');
const updateTimeInOut = (evt) => {
  const element = evt.target;
  if (element.id === 'timein') {
    switch (element.value) {
      case REGISTRATION_HOURS[0]:
        timeOutElement.value = REGISTRATION_HOURS[0];
        break;
      case REGISTRATION_HOURS[1]:
        timeOutElement.value = REGISTRATION_HOURS[1];
        break;
      case REGISTRATION_HOURS[2]:
        timeOutElement.value = REGISTRATION_HOURS[2];
        break;
    }
  }
  if (element.id === 'timeout') {
    switch (element.value) {
      case REGISTRATION_HOURS[0]:
        timeInElement.value = REGISTRATION_HOURS[0];
        break;
      case REGISTRATION_HOURS[1]:
        timeInElement.value = REGISTRATION_HOURS[1];
        break;
      case REGISTRATION_HOURS[2]:
        timeInElement.value = REGISTRATION_HOURS[2];
        break;
    }
  }
};

formElementTime.addEventListener('change', updateTimeInOut);

export {
  priceElement,
  kindTypeElement,
  minPrice,
  pristine
};
