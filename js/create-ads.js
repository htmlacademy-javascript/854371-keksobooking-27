import {
  HOUSING_TYPES_TRANSLATE,
  NUMBER_VISIBLE_ADS
} from './contants.js';

import {
  translateWord,
  editTemplate
} from './utils.js';

const adsFragment = document.createDocumentFragment();
const adCardTemplate = document.querySelector('#card').content.querySelector('.popup');

/**
 * Создает html-фрагмент, который в последущем используется для балуна в попапе
 * @param ads
 */
const createAds = (ads) => {
  ads = ads.splice(NUMBER_VISIBLE_ADS);
  ads.forEach(({
    offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos},
    author: {avatar}
  }) => {
    const adCard = adCardTemplate.cloneNode(true);
    editTemplate('popup__title', title, adCard, title);
    editTemplate('popup__text--address', address, adCard, address);
    editTemplate('popup__text--price', price, adCard, `${price} ₽/ночь`);
    editTemplate('popup__type', type, adCard, translateWord(HOUSING_TYPES_TRANSLATE, type));
    editTemplate('popup__text--capacity', rooms, adCard, `${rooms} комнаты`);
    if (guests) {
      adCard.querySelector('.popup__text--capacity').textContent += ` для ${guests} гостей.`;
    }
    editTemplate('popup__text--time', checkin, adCard, `Заезд после ${checkin}`);
    if (checkout) {
      adCard.querySelector('.popup__text--time').textContent += `, выезд до ${checkout}`;
    }
    if (features) {
      const popupFeatures = adCard.querySelectorAll('.popup__feature');
      popupFeatures.forEach((popupFeature) => {
        const isFeature = features.some((element) => popupFeature.classList.contains(`popup__feature--${element}`));
        if (!isFeature) {
          popupFeature.remove();
        }
      });
    } else {
      adCard.querySelector('.popup__features').style.display = 'none';
    }
    editTemplate('popup__description', description, adCard, description);
    const popupPhotos = adCard.querySelector('.popup__photos');
    const popupPhotoTemplate = adCard.querySelector('.popup__photo');
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
      adCard.querySelector('.popup__avatar').src = avatar;
    } else {
      adCard.querySelector('.popup__avatar').style.display = 'none';
    }
    adsFragment.appendChild(adCard);
  });
};

export {
  adsFragment,
  createAds
};
