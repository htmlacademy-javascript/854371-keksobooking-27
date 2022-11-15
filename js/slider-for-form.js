import {MAX_PRICE_INPUT_VALUE} from './contants.js';
import {adFormElement} from './form.js';
import {
  kindType,
  minPrice,
  price
} from './validate-form.js';

const adFormSlider = adFormElement.querySelector('.ad-form__slider');

noUiSlider.create(adFormSlider, {
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
  price.value = adFormSlider.noUiSlider.get();
};

adFormSlider.noUiSlider.on('update', onAdFormSliderUpdate);

const onPriceChange = () => {
  adFormSlider.noUiSlider.set(price.value);
};

price.addEventListener('change', onPriceChange);

const onKindTypeChange = () => {
  const value = kindType.value;
  adFormSlider.noUiSlider.updateOptions({
    range: {
      min: minPrice[value],
      max: MAX_PRICE_INPUT_VALUE
    },
    start: minPrice[value]
  });
};

kindType.addEventListener('change', onKindTypeChange);

adFormSlider.setAttribute('disabled', 'true');

export {adFormSlider};
