import {createAds} from './create-ads.js';
import './form.js';
import './validate-form.js';
import {drawPinsOnLayerGroup} from './map.js';
import './slider-for-form.js';
import {getData} from './api.js';
import './working-with-form.js';

getData((ads) => {
  createAds(ads);
  drawPinsOnLayerGroup(ads);
});
