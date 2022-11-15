import {MAX_PRICE_INPUT_VALUE} from './contants.js';
import {adFormElement} from './form.js';
import {
  kindType,
  minPrice,
  price
} from './validate-form.js';

const adFormSliderElement = adFormElement.querySelector('.ad-form__slider');

noUiSlider.create(adFormSliderElement, {
  range: {
    min: 0,
    max: MAX_PRICE_INPUT_VALUE,
  },
  start: 1000,
  step: 100,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value),
  }
});

const onAdFormSliderUpdate = () => {
  price.value = adFormSliderElement.noUiSlider.get();
};

adFormSliderElement.noUiSlider.on('update', onAdFormSliderUpdate);

const onPriceChange = () => {
  adFormSliderElement.noUiSlider.set(price.value);
};

price.addEventListener('change', onPriceChange);

const onKindTypeChange = () => {
  const value = kindType.value;
  adFormSliderElement.noUiSlider.updateOptions({
    range: {
      min: minPrice[value],
      max: MAX_PRICE_INPUT_VALUE
    },
    start: minPrice[value]
  });
};

kindType.addEventListener('change', onKindTypeChange);

adFormSliderElement.setAttribute('disabled', 'true');

export {adFormSliderElement};
