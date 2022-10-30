import {createAds} from './create-ads.js';
import {mapFilters} from './form.js';
import {
  drawPinsOnLayerGroup,
  layerGroup
} from './map.js';

const filterSelectors = (ads) => {
  const copyAds = ads.slice();
  let filteredAds;
  const onMapFiltersChange = (evt) => {
    layerGroup.clearLayers();
    const element = evt.target;
    if (element.id === 'housing-type') {
      filteredAds = copyAds.filter(({offer: {type}}) => type === element.value);
    }
    const filteredAdsFragment = createAds(filteredAds);
    drawPinsOnLayerGroup(filteredAds, filteredAdsFragment);
  };
  mapFilters.addEventListener('change', onMapFiltersChange);
};

export {filterSelectors};

