import {adForm} from './form.js';

const pristineConfig = {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'text-help',
};

const pristine = new Pristine(adForm, pristineConfig);
const kindType = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const minPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

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
  pristine.validate(price);
}

kindType.addEventListener('change', onPriceChange);
pristine.addValidator(price, validatePrice, getPriceErrorMessage);

const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');

const validateRoomNumber = (value) => {
  if (value > 3 && +capacity.value !== 0) {
    return false;
  }
  return value >= capacity.value;
};

const getRoomNumberErrorMessage = (value) => {
  if (value > 3) {
    return 'Больше трех комнат только не для гостей';
  }
  return `${capacity.options[capacity.selectedIndex].text} должно быть доступно минимум ${roomNumber.options[(capacity.value - 1)].text}`;
};

const validateCapacity = (value) => {
  // TODO Если равно нулю и кооличество комнат меньше трёх => 'Для не гостей должно быть больше 3-х комнат'
  if (value === 0 && +roomNumber.value < 3) {
    return true;
  }
};

const onRoomNumberChange = () => {
  pristine.validate(capacity);
  pristine.validate(roomNumber);
};

const onCapacityChange = () => {
  pristine.validate(roomNumber);
  pristine.validate(capacity);
};

roomNumber.addEventListener('change', onRoomNumberChange);
capacity.addEventListener('change', onCapacityChange);
pristine.addValidator(roomNumber, validateRoomNumber, getRoomNumberErrorMessage);
pristine.addValidator(capacity, validateCapacity, 'Для не гостей должно быть больше 3-х комнат');

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
