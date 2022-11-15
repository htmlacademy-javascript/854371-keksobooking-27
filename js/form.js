let isFormActive = false;
const adFormElement = document.querySelector('.ad-form');
const adFormInteractiveElements = adFormElement.querySelectorAll('fieldset');
const mapFiltersElement = document.querySelector('.map__filters');
const filterHousingTypeElement = document.querySelector('#housing-type');
const filterHousingPriceElement = document.querySelector('#housing-price');
const filterHousingRoomsElement = document.querySelector('#housing-rooms');
const filterHousingGuestsElement = document.querySelector('#housing-guests');
const mapFiltersInteractiveElements = document.querySelectorAll('.map__filters > *');
const addressElement = adFormElement.querySelector('#address');
const submitButtonFormElement = adFormElement.querySelector('.ad-form__submit');
const resetButtonFormElement = adFormElement.querySelector('.ad-form__reset');

/**
 * Переводит форму и фильтры в НЕактивное состояние
 */
const putFormInactiveState = () => {
  if (!isFormActive) {
    adFormElement.classList.add('ad-form--disabled');
    adFormInteractiveElements.forEach((groupInteractiveElements) => {
      groupInteractiveElements.disabled = true;
    });
    mapFiltersElement.classList.add('ad-form--disabled');
    mapFiltersInteractiveElements.forEach((mapFiltersInteractiveElement) => {
      mapFiltersInteractiveElement.disabled = true;
    });
  }
};

putFormInactiveState();

/**
 * Переводит форму в Активное состояние
 */
const putFormActiveState = () => {
  isFormActive = true;
  adFormElement.classList.remove('ad-form--disabled');
  adFormInteractiveElements.forEach((groupInteractiveElements) => {
    groupInteractiveElements.disabled = false;
  });
};

/**
 * Переводит фильтры в Активное состояние
 */
const putFiltersActiveState = () => {
  mapFiltersElement.classList.remove('ad-form--disabled');
  mapFiltersInteractiveElements.forEach((mapFiltersInteractiveElement) => {
    mapFiltersInteractiveElement.disabled = false;
  });
};

export {
  adFormElement,
  putFormActiveState,
  putFiltersActiveState,
  addressElement,
  submitButtonFormElement,
  resetButtonFormElement,
  mapFiltersElement,
  filterHousingTypeElement,
  filterHousingPriceElement,
  filterHousingRoomsElement,
  filterHousingGuestsElement
};
