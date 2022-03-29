mapboxgl.accessToken =
  "pk.eyJ1Ijoicm9iZXJ0Y2FzdDEyIiwiYSI6ImNremp5ZHdmNTF5OG8ybm9iZ2E1bGFhODAifQ.4gKPVXpglB0fZOIE7YEI1A";
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: [-74.5, 40], // starting position [lng, lat]
  zoom: 9, // starting zoom
});

console.log(map);
