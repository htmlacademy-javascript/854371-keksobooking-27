import {
  HOUSING_TYPES_TRANSLATE,
  NUMBER_VISIBLE_ADS
} from './contants.js';

import {
  translateWord,
  editTemplate
} from './utils.js';

const adCardTemplateElement = document.querySelector('#card').content.querySelector('.popup');

/**
 * Создает html-фрагмент, который в последущем используется для балуна в попапе
 * @param ads
 */
const createAds = (ads) => {
  const adsFragment = document.createDocumentFragment();
  ads.splice(NUMBER_VISIBLE_ADS);
  ads.forEach(({
    offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos},
    author: {avatar}
  }) => {
    const adCardElement = adCardTemplateElement.cloneNode(true);
    editTemplate('popup__title', title, adCardElement, title);
    editTemplate('popup__text--address', address, adCardElement, address);
    editTemplate('popup__text--price', price, adCardElement, `${price} ₽/ночь`);
    editTemplate('popup__type', type, adCardElement, translateWord(HOUSING_TYPES_TRANSLATE, type));
    editTemplate('popup__text--capacity', rooms, adCardElement, `${rooms} комнаты`);
    if (guests) {
      adCardElement.querySelector('.popup__text--capacity').textContent += ` для ${guests} гостей.`;
    }
    editTemplate('popup__text--time', checkin, adCardElement, `Заезд после ${checkin}`);
    if (checkout) {
      adCardElement.querySelector('.popup__text--time').textContent += `, выезд до ${checkout}`;
    }
    if (features) {
      const popupFeaturesElements = adCardElement.querySelectorAll('.popup__feature');
      popupFeaturesElements.forEach((popupFeature) => {
        const isFeature = features.some((element) => popupFeature.classList.contains(`popup__feature--${element}`));
        if (!isFeature) {
          popupFeature.remove();
        }
      });
    } else {
      adCardElement.querySelector('.popup__features').style.display = 'none';
    }
    editTemplate('popup__description', description, adCardElement, description);
    const popupPhotos = adCardElement.querySelector('.popup__photos');
    const popupPhotoTemplate = adCardElement.querySelector('.popup__photo');
    if (photos) {
      popupPhotos.innerHTML = '';
      photos.forEach((photo) => {
        const popupPhoto = popupPhotoTemplate.cloneNode(true);
        popupPhoto.src = photo;
        popupPhotos.append(popupPhoto);
      });
    } else {
      popupPhotos.style.display = 'none';
    }
    if (avatar) {
      adCardElement.querySelector('.popup__avatar').src = avatar;
    } else {
      adCardElement.querySelector('.popup__avatar').style.display = 'none';
    }
    adsFragment.appendChild(adCardElement);
  });
  return adsFragment;
};

export {
  createAds
};
