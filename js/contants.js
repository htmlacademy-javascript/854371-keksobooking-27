import {getRandomFloatNumber} from './utils.js';

const AVATAR_NUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
const AD_TITLES = ['Романтика мегаполиса', 'Несущие опоры как арт-объект', 'Симфония стиля', 'Симбиоз авангарда и классики', 'Гармония, построенная на принципах свободы', 'Царство королевы цветов', 'Штучный экземпляр', 'Морские просторы', 'С мечтой об античности', 'Естественное течение жизни', 'Тишина и покой загородной жизни.'];
const HOUSING_TYPES = ['place', 'flat', 'house', 'bungalow', 'hotel'];
const REGISTRATION_HOURS = ['12:00', '13:00', '14:00'];
const HOUSING_TYPES_TRANSLATE = {
  'place': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};
const PROPERTY_AMENITIES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const AD_DESCRIPTIONS = ['Раз, два - Фредди заберёт тебя. Три, четыре - закончили упражнение.', 'Редкая собака добежит до середины Кореи.', '"Чуть ланфрен не откусили..." - ёжился Боярский, смутно припоминая подробности бурной ночи.', 'Самый долгий телефонный разговор зафиксирован в Москве, когда Тина Канделаки случайно позвонила Андрею Малахову.', 'Атеист москит не верит в Дракулу.', 'Замужем надо следить за собой, иначе придется следить за мужем.', 'В детстве я боялся темноты. Теперь, видя свои счета за электроэнергию, я боюсь света.', 'Таня помешана на Скайпе. Поэтому она убирает только ту часть комнаты, которая видна на мониторе.', 'В опустевшей лечебнице холод и стук костей; говорят, пропадают дети десяток лет', 'Сила твоя не в том, чтоб меня ломать', 'Его подбирает другой человек и заботится о нём пока главный герой в ответ делает всё чтобы помочь новоиспечённому другу. А в голове лишь один вопрос - как признаться что ты не просто животное'];
const AD_PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const ADDRESS_LAT = getRandomFloatNumber(35.65, 35.70, 5);
const ADDRESS_LNG = getRandomFloatNumber(139.70, 139.80, 5);
const LOCATION_LAT = getRandomFloatNumber(35.65, 35.70, 5);
const LOCATION_LNG = getRandomFloatNumber(139.70, 139.80, 5);
const MAXIMUM_GUEST_ROOMS = 3;
const VALUE_OPTION_NOT_FOR_GUESTS = 0;

export {
  AVATAR_NUMBERS,
  AD_TITLES,
  HOUSING_TYPES,
  HOUSING_TYPES_TRANSLATE,
  REGISTRATION_HOURS,
  PROPERTY_AMENITIES,
  AD_DESCRIPTIONS,
  AD_PHOTOS,
  ADDRESS_LAT,
  ADDRESS_LNG,
  LOCATION_LAT,
  LOCATION_LNG,
  MAXIMUM_GUEST_ROOMS,
  VALUE_OPTION_NOT_FOR_GUESTS,
};
