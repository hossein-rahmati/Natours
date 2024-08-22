/* eslint-disable */

const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoiaG9zc2VpbnJhaG1hdGkiLCJhIjoiY20wNThmbTloMGhkNzJycjBpYnFnYTh6aiJ9.oGpNCPXlNMsbNXI4dQamaA';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/hosseinrahmati/cm05bv0n200gc01ph64wv9ruo',
  center: [-118, 34],
});
