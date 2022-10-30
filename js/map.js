import {COORDINATES_MAIN_PIN} from './contants.js';

import {
  putFormActiveState,
  address,
  putFiltersActiveState
} from './form.js';

import {adFormSlider} from './slider-for-form.js';

const map = L.map('map-canvas')
  .on('load', () => {
    putFormActiveState();
    adFormSlider.removeAttribute('disabled');
  })
  .setView([COORDINATES_MAIN_PIN.lat, COORDINATES_MAIN_PIN.lng], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const mainMarkerIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52]
});

const mainPinMarker = L.marker(
  {
    lat: COORDINATES_MAIN_PIN.lat,
    lng: COORDINATES_MAIN_PIN.lng
  },
  {
    draggable: true,
    icon: mainMarkerIcon
  }
);

address.value = `${COORDINATES_MAIN_PIN.lat}, ${COORDINATES_MAIN_PIN.lng}`;

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const latLng = evt.target.getLatLng();
  address.value = `${latLng.lat.toFixed(5)}, ${latLng.lng.toFixed(5)}`;
});

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const layerGroup = L.layerGroup().addTo(map);

/**
 * Отвечает за отрисовку каждого объяления в виде метки на карте
 * @param point данные объявления
 * @param index индекс элемента в массиве объявлений
 * @param documentFragment подготовленная разметка для балунов
 */
const createPoints = (point, index, documentFragment) => {
  const {location: {lat, lng}} = point;
  const adsMarker = L.marker(
    {
      lat,
      lng
    },
    {
      icon: pinIcon
    }
  );
  adsMarker
    .addTo(layerGroup)
    .bindPopup(documentFragment.children[index]);
};

const resetMap = () => {
  mainPinMarker.setLatLng({
    lat: COORDINATES_MAIN_PIN.lat,
    lng: COORDINATES_MAIN_PIN.lng
  });
  map.closePopup();
  map.setView([COORDINATES_MAIN_PIN.lat, COORDINATES_MAIN_PIN.lng], 13);
};

const drawPinsOnLayerGroup = (ads, documentFragment) => {
  ads.forEach((adData, index) => {
    createPoints(adData, index, documentFragment);
  });
  putFiltersActiveState();
};

export {
  map,
  layerGroup,
  resetMap,
  drawPinsOnLayerGroup
};
