import {
  getRandomArrayElement,
  getRandomFloatNumber,
  getRandomNumber
} from './utils.js';
import {
  AVATAR_NUMBERS,
  AD_TITLES,
  HOUSING_TYPES,
  REGISTRATION_HOURS,
  PROPERTY_AMENITIES,
  AD_DESCRIPTIONS,
  AD_PHOTOS,
  ADDRESS_LAT,
  ADDRESS_LNG
} from './contants.js';

/**
 * Создаёт адрес аватара пользователя
 * @return {`img/avatars/user${*}.png`}
 */
const createAvatarSrc = () => {
  const numberAvatar = getRandomArrayElement(AVATAR_NUMBERS);
  const indexNumber = AVATAR_NUMBERS.indexOf(numberAvatar);
  AVATAR_NUMBERS.splice(indexNumber, 1);
  return `img/avatars/user${numberAvatar}.png`;
};

/**
 * Создаёт массив мнимых преимуществ сдаваемого помещения
 * @return {*[]}
 */
const createArrayPropertyAmenities = () => {
  const propertyAmenities = [];
  let counter = 0;
  const numberProperties = getRandomNumber(1, PROPERTY_AMENITIES.length - 1);
  const copyPropertyAmenities = PROPERTY_AMENITIES.slice();
  while (counter <= numberProperties) {
    const property = getRandomArrayElement(copyPropertyAmenities);
    propertyAmenities.push(property);
    const indexProperty = copyPropertyAmenities.indexOf(property);
    copyPropertyAmenities.splice(indexProperty, 1);
    counter++;
  }
  return propertyAmenities;
};

/**
 * Создаёт массив мнимых фото сдаваемого помещения
 * @return {*[]}
 */
const createArrayPhotos = () => {
  const arrayPhotos = [];
  for (let j = 0; j < getRandomNumber(1, 6); j++) {
    arrayPhotos.push(getRandomArrayElement(AD_PHOTOS));
  }
  return arrayPhotos;
};

/**
 * Функция конструктор объекта
 * @return {{offer: {features: *[], rooms: number, address: string, checkin: *, price: number, guests: number,
 *   description: *, title: *, type: *, checkout: *, photos: *[]}, author: {avatar: `img/avatars/user${*}.png`},
 *   location: {lng: number, lat: number}}}
 */
const createAdvertisement = () => ({
  'author': {
    'avatar': createAvatarSrc()
  },
  'offer': {
    'title': getRandomArrayElement(AD_TITLES),
    'address': `${ADDRESS_LAT}, ${ADDRESS_LNG}`,
    'price': getRandomNumber(10, 100) * 100,
    'type': getRandomArrayElement(HOUSING_TYPES),
    'rooms': getRandomNumber(1, 10),
    'guests': getRandomNumber(1, 20),
    'checkin': getRandomArrayElement(REGISTRATION_HOURS),
    'checkout': getRandomArrayElement(REGISTRATION_HOURS),
    'features': createArrayPropertyAmenities(),
    'description': getRandomArrayElement(AD_DESCRIPTIONS),
    'photos': createArrayPhotos()
  },
  'location': {
    'lat': getRandomFloatNumber(35.65, 35.70, 5),
    'lng': getRandomFloatNumber(139.70, 139.80, 5)
  }
});

/**
 * Создает 10 минимых объявлений об аренде жилья
 * @return {{offer: {features: *[], rooms: number, address: string, checkin: *, price, guests: number, description: *,
 *   title: *, type: *, checkout: *, photos: *[]}, author: {avatar: `img/avatars/user${*}.png`}, location: {lng:
 *   number, lat: number}}[]}
 */
const generateData = () => Array.from({length: 10}, createAdvertisement);

export {generateData};
