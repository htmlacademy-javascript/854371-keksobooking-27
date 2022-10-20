import {adsData} from './create-ads.js';
import {
  putFormActiveState,
  address
} from './form.js';

const map = L.map('map-canvas')
  .on('load', () => {
    putFormActiveState();
  })
  .setView([35.682, 139.753], 8.2);

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
    lat: 35.682,
    lng: 139.753
  },
  {
    draggable: true,
    icon: mainMarkerIcon
  }
);

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

const createPoints = (point) => {
  const {location: {lat, lng}} = point;
  const adsMarker = L.marker(
    {
      lat: lat,
      lng: lng,
    },
    {
      draggable: true,
      icon: pinIcon,
    }
  );
  adsMarker.addTo(layerGroup);
};

adsData.forEach((adData) => {
  createPoints(adData);
});
