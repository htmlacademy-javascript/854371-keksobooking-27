import {createAds} from './create-ads.js';
import './form.js';
import './validate-form.js';
import {filterSelectors} from './filtering-pins-on-map.js';
import {drawPinsOnLayerGroup} from './map.js';
import './slider-for-form.js';
import {getData} from './api.js';
import './working-with-form.js';

getData((ads) => {
  //const copyAds = ads.slice();
  filterSelectors(ads);
  drawPinsOnLayerGroup(ads, createAds(ads));
});
