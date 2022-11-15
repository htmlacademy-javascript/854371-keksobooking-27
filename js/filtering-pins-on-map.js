import {
  AdsPrise,
  DEFAULT_SELECT_VALUE,
  TIMEOUT_FILTER_DELAY
} from './contants.js';

import {createAds} from './create-ads.js';

import {
  mapFiltersElement,
  filterHousingTypeElement,
  filterHousingPriceElement,
  filterHousingRoomsElement,
  filterHousingGuestsElement
} from './form.js';

import {
  drawPinsOnLayerGroup,
  layerGroup
} from './map.js';

import {
  compareArrays,
  showAlert
} from './utils.js';

let filteredAds;

const onHousingTypeChange = () => {
  if (filterHousingTypeElement.value !== DEFAULT_SELECT_VALUE) {
    filteredAds = filteredAds.filter(({offer: {type}}) => type === filterHousingTypeElement.value);
  }
};

const onHousingPriceChange = () => {
  if (filterHousingPriceElement.value !== DEFAULT_SELECT_VALUE) {
    const levelPrice = filterHousingPriceElement.value;
    switch (levelPrice) {
      case 'middle':
        filteredAds = filteredAds.filter(({offer: {price}}) => price >= AdsPrise.MIN && price <= AdsPrise.MAX);
        break;
      case 'low':
        filteredAds = filteredAds.filter(({offer: {price}}) => price < AdsPrise.MIN);
        break;
      case 'high':
        filteredAds = filteredAds.filter(({offer: {price}}) => price > AdsPrise.MAX);
        break;
    }
  }
};

const onHousingRoomsChange = () => {
  if (filterHousingRoomsElement.value !== DEFAULT_SELECT_VALUE) {
    const countRooms = filterHousingRoomsElement.value;
    filteredAds = filteredAds.filter(({offer: {rooms}}) => rooms === +countRooms);
  }
};

const onFilterHousingGuestsChange = () => {
  if (filterHousingGuestsElement.value !== DEFAULT_SELECT_VALUE) {
    const countGuests = filterHousingGuestsElement.value;
    filteredAds = filteredAds.filter(({offer: {guests}}) => guests === +countGuests);
  }
};

const onFeatureMapCheckboxesChange = (filteredAdsItems) => {
  const featuresCheckboxes = document.querySelectorAll('.map__checkbox:checked');
  const filteredAdsCopy = filteredAdsItems.slice();
  if (featuresCheckboxes.length !== 0) {
    const featuresCheckboxesValues = [];
    featuresCheckboxes.forEach((featuresCheckbox) => {
      featuresCheckboxesValues.push(featuresCheckbox.value);
    });

    const sortFilteredAdsCopy = [];
    filteredAdsCopy.forEach((filteredAd) => {
      const {offer: {features}} = filteredAd;
      if (features) {
        const isCompare = compareArrays(features, featuresCheckboxesValues);
        if (isCompare) {
          sortFilteredAdsCopy.push(filteredAd);
        }
      }
    });
    filteredAds = sortFilteredAdsCopy;
  }
};

const drawFilteredLabels = (filtered) => {
  const copyFilteredItems = filtered.slice();
  layerGroup.clearLayers();
  const filteredAdsFragment = createAds(copyFilteredItems);
  drawPinsOnLayerGroup(copyFilteredItems, filteredAdsFragment);
};

const filterSelectors = (ads) => {
  const copyAds = ads.slice();
  let timeoutId;
  mapFiltersElement.addEventListener('change', () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      filteredAds = copyAds;
      onFeatureMapCheckboxesChange(filteredAds);
      onHousingTypeChange();
      onHousingPriceChange();
      onHousingRoomsChange();
      onFilterHousingGuestsChange();
      if (filteredAds.length !== 0) {
        drawFilteredLabels(filteredAds);
      } else {
        layerGroup.clearLayers();
        showAlert('По вашим фильтрам не найдено совпадений');
      }
    }, TIMEOUT_FILTER_DELAY);
  });
};

export {filterSelectors};

