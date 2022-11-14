const REGISTRATION_HOURS = ['12:00', '13:00', '14:00'];
const HOUSING_TYPES_TRANSLATE = {
  'place': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};
const MAXIMUM_GUEST_ROOMS = 3;
const VALUE_OPTION_NOT_FOR_GUESTS = 0;
const MAX_PRICE_INPUT_VALUE = 100000;
const COORDINATES_MAIN_PIN = {
  lat: 35.68521,
  lng: 139.75261
};
const DATA_RECEIVING_ADDRESS = 'https://27.javascript.pages.academy/keksobooking/data';
const DATA_SENDING_ADDRESS = 'https://27.javascript.pages.academy/keksobooking';
const POP_UP_CLOSING_TIME = 5000;
const NUMBER_VISIBLE_ADS = 10;
const DEFAULT_SELECT_VALUE = 'any';
const AdsPrise = {
  MIN: 10000,
  MAX: 50000
};
const TIMEOUT_FILTER_DELAY = 500;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const AVATAR_PREVIEW_SRC_DEFAULT = 'img/muffin-grey.svg';
const HOUSE_PREVIEW_COLOR_DEFAULT = '#e4e4de';

export {
  HOUSING_TYPES_TRANSLATE,
  REGISTRATION_HOURS,
  MAXIMUM_GUEST_ROOMS,
  VALUE_OPTION_NOT_FOR_GUESTS,
  MAX_PRICE_INPUT_VALUE,
  COORDINATES_MAIN_PIN,
  DATA_RECEIVING_ADDRESS,
  DATA_SENDING_ADDRESS,
  POP_UP_CLOSING_TIME,
  NUMBER_VISIBLE_ADS,
  DEFAULT_SELECT_VALUE,
  AdsPrise,
  TIMEOUT_FILTER_DELAY,
  FILE_TYPES,
  AVATAR_PREVIEW_SRC_DEFAULT,
  HOUSE_PREVIEW_COLOR_DEFAULT
};
