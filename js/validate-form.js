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

const validatePrice = (value) => value >= minPrice[kindType.value];

const getPriceErrorMessage = () => `Цена за ${kindType.options[kindType.selectedIndex].text} должна быть не меньше ${minPrice[kindType.value]} &#8381;`;

function onPriceChange() {
  price.placeholder = minPrice[this.value];
  pristine.validate(price);
}

kindType.addEventListener('change', onPriceChange);

pristine.addValidator(price, validatePrice, getPriceErrorMessage);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
