/**
 * Функция, возвращающая случайное целое число из переданного диапазона включительно
 * @param minNumber {number} начало диапазона
 * @param maxNumber {number} конец диапазона
 * @return {number} рандомное число
 */
const getRandomNumber = (minNumber = 0, maxNumber = 0) => {
  if (minNumber > maxNumber) {
    const mindNumber = minNumber;
    minNumber = maxNumber;
    maxNumber = mindNumber;
  }
  return Math.floor(Math.random() * (maxNumber + 1 - minNumber)) + minNumber;
};

getRandomNumber(0, 2);

/**
 * Функция, возвращающая случайное нецелое число из переданного диапазона включительно
 * @param minNumber {number} начало диапазона
 * @param maxNumber {number} конец диапазона
 * @param precisionNumber {number} переменная, которая определяет количество знаков после запятой
 * @return {number} рандомное число с плавающей точкой округленное до precisionNumber
 */
const getRandomFloatNumber = (minNumber = 0, maxNumber = 0, precisionNumber = 0) => {
  if (minNumber > maxNumber) {
    const mindNumber = minNumber;
    minNumber = maxNumber;
    maxNumber = mindNumber;
  }
  const randomNumber = Math.random() * (maxNumber + 1 - minNumber) + minNumber;
  return Number(randomNumber.toFixed(precisionNumber));
};

getRandomFloatNumber(0, 2, 2);

const AVATAR_NAMBERS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
const AD_TITLES = ['Романтика мегаполиса', 'Несущие опоры как арт-объект', 'Симфония стиля', 'Симбиоз авангарда и классики', 'Гармония, построенная на принципах свободы', 'Царство королевы цветов', 'Штучный экземпляр', 'Морские просторы', 'С мечтой об античности', 'Естественное течение жизни', 'Тишина и покой загородной жизни.'];
const HOUSING_TYPES = ['place', 'flat', 'house', 'bungalow', 'hotel'];
const REGISTRATION_HOURS = ['12:00', '13:00', '14:00'];
const PROPERTY_AMENITIES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const AD_DESCRIPTIONS = ['Раз, два - Фредди заберёт тебя. Три, четыре - закончили упражнение.', 'Редкая собака добежит до середины Кореи.', '"Чуть ланфрен не откусили..." - ёжился Боярский, смутно припоминая подробности бурной ночи.', 'Самый долгий телефонный разговор зафиксирован в Москве, когда Тина Канделаки случайно позвонила Андрею Малахову.', 'Атеист москит не верит в Дракулу.', 'Замужем надо следить за собой, иначе придется следить за мужем.', 'В детстве я боялся темноты. Теперь, видя свои счета за электроэнергию, я боюсь света.', 'Таня помешана на Скайпе. Поэтому она убирает только ту часть комнаты, которая видна на мониторе.', 'В опустевшей лечебнице холод и стук костей; говорят, пропадают дети десяток лет', 'Сила твоя не в том, чтоб меня ломать', 'Его подбирает другой человек и заботится о нём пока главный герой в ответ делает всё чтобы помочь новоиспечённому другу. А в голове лишь один вопрос - как признаться что ты не просто животное'];
const AD_PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

/**
 * Возвращает случайный элемент переданного массива
 * @param array {array} массив из которого нужно вернуть случайное значк=ение
 * @return {*} случайный элемент массива
 */
const getRandomArrayElement = (array) => array[getRandomNumber(0, array.length - 1)];

/**
 * Создаёт адрес аватара пользователя
 * @return {`img/avatars/user${*}.png`}
 */
const createAvatarSrc = () => {
  const numberAvatar = getRandomArrayElement(AVATAR_NAMBERS);
  const indexNumber = AVATAR_NAMBERS.indexOf(numberAvatar);
  AVATAR_NAMBERS.splice(indexNumber, 1);
  return `img/avatars/user${numberAvatar}.png`;
};

/**
 * Создаёт массив мнимых преимуществ сдаваемого помещения
 * @return {*[]}
 */
const createArrayPropertyAmenities = () => {
  const copyPropertyAmenities = PROPERTY_AMENITIES;
  const propertyAmenities = [];
  for (let i = 0; i < getRandomNumber(1, copyPropertyAmenities.length); i++) {
    const property = getRandomArrayElement(copyPropertyAmenities);
    propertyAmenities.push(property);
    const indexProperty = copyPropertyAmenities.indexOf(property);
    copyPropertyAmenities.splice(indexProperty, 1);
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
 * @return {{offer: {features: *[], rooms: number, address: string, checkin: *, price: number, guests: number, description: *, title: *, type: *, checkout: *, photos: *[]}, author: {avatar: `img/avatars/user${*}.png`}, location: {lng: number, lat: number}}}
 */
const createAdvertisement = () => ({
  'author': {
    'avatar': createAvatarSrc(),
  },
  'offer': {
    'title': getRandomArrayElement(AD_TITLES),
    'address': `${getRandomFloatNumber(35.65, 35.70, 5)}, ${getRandomFloatNumber(139.70, 139.80, 5)}`,
    'price': getRandomNumber(10, 100) * 100,
    'type': getRandomArrayElement(HOUSING_TYPES),
    'rooms': getRandomNumber(1, 10),
    'guests': getRandomNumber(1, 20),
    'checkin': getRandomArrayElement(REGISTRATION_HOURS),
    'checkout': getRandomArrayElement(REGISTRATION_HOURS),
    'features': createArrayPropertyAmenities(),
    'description': getRandomArrayElement(AD_DESCRIPTIONS),
    'photos': createArrayPhotos(),
  },
  'location': {
    'lat': getRandomFloatNumber(35.65, 35.70, 5),
    'lng': getRandomFloatNumber(139.70, 139.80, 5),
  },
});

Array.from({length: 10}, createAdvertisement);
