// const { Map, Marker } = require("mapbox-gl");
import { insertarMapa, removerLoader } from "./functions.js";
try {
  mapboxgl.accessToken =
    "pk.eyJ1Ijoicm9iZXJ0Y2FzdDEyIiwiYSI6ImNremp5ZHdmNTF5OG8ybm9iZ2E1bGFhODAifQ.4gKPVXpglB0fZOIE7YEI1A";
} catch (error) {
  removerLoader(error);
}

navigator.geolocation.getCurrentPosition(insertarMapa, (err) => {
  console.log(err);
  removerLoader(err);
});
