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
  if (filterHousingType.value !== 'any') {
    filteredAds = filteredAds.filter(({offer: {type}}) => type === filterHousingType.value);
  }
};

const onHousingPriceChange = () => {
  if (filterHousingPrice.value !== 'any') {
    const levelPrice = filterHousingPrice.value;
    switch (levelPrice) {
      case 'middle':
        filteredAds = filteredAds.filter(({offer: {price}}) => price >= 10000 && price <= 50000);
        break;
      case 'low':
        filteredAds = filteredAds.filter(({offer: {price}}) => price < 10000);
        break;
      case 'high':
        filteredAds = filteredAds.filter(({offer: {price}}) => price > 50000);
        break;
    }
  }
};

const onHousingRoomsChange = () => {
  if (filterHousingRooms.value !== 'any') {
    const countRooms = filterHousingRooms.value;
    filteredAds = filteredAds.filter(({offer: {rooms}}) => rooms === +countRooms);
  }
};

const onFilterHousingGuestsChange = () => {
  if (filterHousingGuests.value !== 'any') {
    const countGuests = filterHousingGuests.value;
    filteredAds = filteredAds.filter(({offer: {guests}}) => guests === +countGuests);
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
    if (filteredAds.length !== 0) {
      drawFilteredLabels(filteredAds);
    } else {
      layerGroup.clearLayers();
      showAlert('По вашим фильтрам не найдено совпадений');
    }
  });
};

export {filterSelectors};

