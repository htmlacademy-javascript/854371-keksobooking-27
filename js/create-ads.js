import {generateData} from './generate-data.js';
import {HOUSING_TYPES_TRANSLATE} from './contants.js';
import {translateWord} from './utils.js';

const adsData = generateData();
const adsFragment = document.createDocumentFragment();

const adCard = document.querySelector('#card').content.querySelector('.popup');

adsData.forEach(({
  offer: {title, address, price, type, rooms, guests, features, description, photos},
  author: {avatar}
}, index) => {
  adCard.cloneNode(true);
  adCard.querySelector('.popup__title').textContent = title;
  adCard.querySelector('.popup__text--address').textContent = address;
  adCard.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;

  if (index === 0) {
    const map = document.querySelector('#map-canvas');
    map.append(adCard);
  }
});
