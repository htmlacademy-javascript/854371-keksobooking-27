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
  lat: 35.682,
  lng: 139.753
};
const DATA_RECEIVING_ADDRESS = 'https://27.javascript.pages.academy/keksobooking/data';
const DATA_SENDING_ADDRESS = 'https://27.javascript.pages.academy/keksobooking';
const POP_UP_CLOSING_TIME = 5000;

export {
  HOUSING_TYPES_TRANSLATE,
  REGISTRATION_HOURS,
  MAXIMUM_GUEST_ROOMS,
  VALUE_OPTION_NOT_FOR_GUESTS,
  MAX_PRICE_INPUT_VALUE,
  COORDINATES_MAIN_PIN,
  DATA_RECEIVING_ADDRESS,
  DATA_SENDING_ADDRESS,
  POP_UP_CLOSING_TIME
};
