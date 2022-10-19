import {
  putFormActiveState,
  address
} from './form.js';
import {adsData} from './create-ads.js';

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
  iconUrl: 'img/main-pin.svg',
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

const icon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainMarkerGroup = L.layerGroup().addTo(map);

const createMarker = (point) => {
  const {location: {lat, lng}} = point;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );
  marker.addTo(mainMarkerGroup);
};

adsData.forEach((point) => {
  createMarker(point);
});
