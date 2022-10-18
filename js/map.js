import {
  putFormActiveState,
  address
} from './form.js';

const map = L.map('map-canvas')
  .on('load', () => {
    putFormActiveState();
  })
  .setView([35.42, 139.36], 13);

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
    lat: 35.42,
    lng: 139.36
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

