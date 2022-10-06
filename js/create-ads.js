import {generateData} from './generate-data.js';
import {HOUSING_TYPES_TRANSLATE} from './contants.js';
import {translateWord} from './utils.js';

const adsData = generateData();
const adsFragment = document.createDocumentFragment();
const adCardTemplate = document.querySelector('#card').content.querySelector('.popup');

adsData.forEach(({
  offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos},
  author: {avatar}
}, index) => {
  const adCard = adCardTemplate.cloneNode(true);
  adCard.querySelector('.popup__title').textContent = title;
  adCard.querySelector('.popup__text--address').textContent = address;
  adCard.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  adCard.querySelector('.popup__type').textContent = translateWord(HOUSING_TYPES_TRANSLATE, type);
  adCard.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей.`;
  adCard.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  const popupFeatures = adCard.querySelectorAll('.popup__feature');
  popupFeatures.forEach((popupFeature) => {
    const isFeature = features.some((element) => popupFeature.classList.contains(`popup__feature--${element}`));
    if (!isFeature) {
      popupFeature.remove();
    }
  });
  adCard.querySelector('.popup__description').textContent = description;
  const popupPhotos = adCard.querySelector('.popup__photos');
  const popupPhotoTemplate = adCard.querySelector('.popup__photo');
  popupPhotos.innerHTML = '';
  photos.forEach((photo) => {
    const popupPhoto = popupPhotoTemplate.cloneNode(true);
    popupPhoto.src = photo;
    popupPhotos.insertAdjacentElement('beforeend', popupPhoto);
  });
  adCard.querySelector('.popup__avatar').src = avatar;
  adsFragment.appendChild(adCard);
  if (index === 0) {
    const map = document.querySelector('#map-canvas');
    map.append(adsFragment);
  }
});
