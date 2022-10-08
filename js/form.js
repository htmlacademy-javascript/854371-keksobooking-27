let isFormActive = false;
const adForm = document.querySelector('.ad-form');
const adFormInteractiveElements = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersInteractiveElements = document.querySelectorAll('.map__filters > *');

/**
 * Переводит форму и фильтры в НЕактивное состояние
 */
const putFormInactiveState = () => {
  if (!isFormActive) {
    adForm.classList.add('ad-form--disabled');
    adFormInteractiveElements.forEach((groupInteractiveElements) => {
      groupInteractiveElements.disabled = true;
    });
    mapFilters.classList.add('ad-form--disabled');
    mapFiltersInteractiveElements.forEach((mapFiltersInteractiveElement) => {
      mapFiltersInteractiveElement.disabled = true;
    });
  }
};

putFormInactiveState();

/**
 * Переводит форму и фильтры в Активное состояние
 */
const putFormActiveState = () => {
  isFormActive = true;
  adForm.classList.remove('ad-form--disabled');
  adFormInteractiveElements.forEach((groupInteractiveElements) => {
    groupInteractiveElements.disabled = false;
  });
  mapFilters.classList.remove('ad-form--disabled');
  mapFiltersInteractiveElements.forEach((mapFiltersInteractiveElement) => {
    mapFiltersInteractiveElement.disabled = false;
  });
};

putFormActiveState();
