import {
  AdsPrise,
  DEFAULT_SELECT_VALUE
} from './contants.js';

import {createAds} from './create-ads.js';

import {
  mapFilters,
  filterHousingType,
  filterHousingPrice,
  filterHousingRooms,
  filterHousingGuests
} from './form.js';

import {
  drawPinsOnLayerGroup,
  layerGroup
} from './map.js';

import {showAlert} from './utils.js';

let filteredAds;

const onHousingTypeChange = () => {
  if (filterHousingType.value !== DEFAULT_SELECT_VALUE) {
    filteredAds = filteredAds.filter(({offer: {type}}) => type === filterHousingType.value);
  }
};

const onHousingPriceChange = () => {
  if (filterHousingPrice.value !== DEFAULT_SELECT_VALUE) {
    const levelPrice = filterHousingPrice.value;
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
  if (filterHousingRooms.value !== DEFAULT_SELECT_VALUE) {
    const countRooms = filterHousingRooms.value;
    filteredAds = filteredAds.filter(({offer: {rooms}}) => rooms === +countRooms);
  }
};

const onFilterHousingGuestsChange = () => {
  if (filterHousingGuests.value !== DEFAULT_SELECT_VALUE) {
    const countGuests = filterHousingGuests.value;
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

    for (let i = 0; i < filteredAdsCopy.length - 1; i++) {
      const {offer: {features}} = filteredAdsCopy[i];
      if (!features) {
        filteredAdsCopy.splice(i, 1);
        i -= 1;
      } else {
        featuresCheckboxesValues.forEach((feature) => {
          const isAdvantageSame = features.some((element) => element === feature);
          if (!isAdvantageSame) {
            filteredAdsCopy.splice(i, 1);
            i -= 1;
          }
        });
      }
    }
    //console.log(filteredAdsCopy);
    filteredAds = filteredAdsCopy;
  }
};

const drawFilteredLabels = (filtered) => {
  layerGroup.clearLayers();
  const filteredAdsFragment = createAds(filtered);
  drawPinsOnLayerGroup(filtered, filteredAdsFragment);
};

const filterSelectors = (ads) => {
  const copyAds = ads.slice();
  mapFilters.addEventListener('change', () => {
    filteredAds = copyAds;
    onHousingTypeChange();
    onHousingPriceChange();
    onHousingRoomsChange();
    onFilterHousingGuestsChange();
    onFeatureMapCheckboxesChange(filteredAds);
    if (filteredAds.length !== 0) {
      drawFilteredLabels(filteredAds);
    } else {
      layerGroup.clearLayers();
      showAlert('По вашим фильтрам не найдено совпадений');
    }
  });
};

export {filterSelectors};

