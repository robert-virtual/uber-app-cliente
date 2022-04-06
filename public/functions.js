// @ts-check
// const { Marker, Popup, Map } = require("mapbox-gl");
const { Marker, Popup, Map, LngLatBounds } = mapboxgl;
const d = document;
const btnMiUbicacion = d.getElementById("btn-mi-ubicacion");
const searchBar = d.getElementById("search-bar");
const searchrResults = d.getElementById("search-results");

/**
 * @type { mapboxgl.Map }
 */
let map;

const mapStyles = [
  "mapbox://styles/mapbox/navigation-day-v1",
  "mapbox://styles/mapbox/streets-v11",
];
let ubicacion = { lat: 0, lng: 0 };
let selectedStyle = 0;
export function removerLoader(err = "") {
  if (err) {
    d.querySelector(".loader").textContent(
      "Ups ha habiido un error al cargar el mapa"
    );
  }
}

export function insertarMapa({ coords }) {
  const { latitude, longitude } = coords;
  ubicacion.lat = latitude;
  ubicacion.lng = longitude;

  try {
    map = new Map({
      container: "map", // container ID
      style: mapStyles[selectedStyle], // style URL
      center: [longitude, latitude], // starting position [lng, lat]
      zoom: 15, // starting zoom
    });
    const popup = new Popup({}).setHTML(`
        <h4 style="color:black;">Mi Ubicacion</h4>
      `);
    new Marker({
      color: "#3b82f6",
    })
      .setLngLat({ lat: latitude, lng: longitude })
      .setPopup(popup)
      .addTo(map);

    setbtnMiUbicacion();
    setSearchBar();
  } catch (error) {
    removerLoader(error);
  }
  removerLoader();
}

function setbtnMiUbicacion() {
  btnMiUbicacion.classList.remove("hidden");
  btnMiUbicacion.onclick = () => {
    console.log("btnMiUbicacion");
    map.flyTo({
      center: ubicacion,
      zoom: 15,
    });
  };
}
const api_url = ``;
//https://api.mapbox.com/geocoding/v5/mapbox.places/dsdsd.json?country=hn&proximity=ip&types=place%2Cpostcode%2Caddress&language=es&access_token=pk.eyJ1Ijoicm9iZXJ0Y2FzdDEyIiwiYSI6ImNremp5ZHdmNTF5OG8ybm9iZ2E1bGFhODAifQ.4gKPVXpglB0fZOIE7YEI1A
function setSearchBar() {
  searchBar.classList.remove("hidden");
  let idTimeOut;
  searchBar.onkeyup = ({ target }) => {
    clearTimeout(idTimeOut);
    idTimeOut = setTimeout(async () => {
      if (!target.value) {
        return;
      }
      let res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${target.value}.json?country=hn&proximity=ip&types=place%2Cpostcode%2Caddress&language=es&access_token=pk.eyJ1Ijoicm9iZXJ0Y2FzdDEyIiwiYSI6ImNremp5ZHdmNTF5OG8ybm9iZ2E1bGFhODAifQ.4gKPVXpglB0fZOIE7YEI1A`
      );
      let data = await res.json();
      console.log(res);
      searchrResults.innerHTML = "";

      data.features.forEach(createResult);
      searchrResults.classList.remove("hidden");
      if (!data.features.length) {
        createResult({
          text: "No se encontrarn resultados",
          place_name_es: target.value,
        });
      }
    }, 500);
  };
}

let markadorPrevio;
function crearMarcador({ lat, lng, kms, minutes }) {
  const popup = new Popup({}).setHTML(`
  <h2 style="color:black;">${minutes} Minutos</h2>
  <h2 style="color:black;">${kms} Kilometros</h2>
  `);
  if (markadorPrevio) {
    markadorPrevio.remove();
  }

  markadorPrevio = new Marker({
    color: "#00dbc5",
  })
    .setLngLat({ lat, lng })
    .setPopup(popup)
    .addTo(map);
  map.flyTo({
    center: { lat, lng },
    zoom: 15,
  });
}

/**
 *
 * @param {{text:string,place_name_es:string,center?:[number,number]}} param0
 */
function createResult({ text, place_name_es, center }) {
  const t = d.createElement("template");
  t.innerHTML = `
          <div class="search-result cursor-pointer">
          <p class="cursor-pointer">
          ${text}
          </p> 
          <p>
          ${place_name_es}
          </p> 
        </div>
          `;
  console.log("keyup");
  if (center) {
    t.content.querySelector("div").onclick = async () => {
      console.log(center);
      const res = await trazarRuta({ lat: center[1], lng: center[0] });
      crearMarcador({ lat: center[1], lng: center[0], ...res });
    };
  }
  searchrResults.append(t.content);
}

let routeid;
async function trazarRuta({ lat, lng }) {
  let endPoint = `https://api.mapbox.com/directions/v5/mapbox/driving/${ubicacion.lng},${ubicacion.lat};${lng},${lat}?alternatives=false&geometries=geojson&overview=simplified&steps=false&access_token=pk.eyJ1Ijoicm9iZXJ0Y2FzdDEyIiwiYSI6ImNremp5ZHdmNTF5OG8ybm9iZ2E1bGFhODAifQ.4gKPVXpglB0fZOIE7YEI1A`;

  const res = await fetch(endPoint);
  const data = await res.json();
  const { geometry, distance, duration } = data.routes[0];
  /**
   * @type {{coordinates:[number,number][]}}
   */
  const { coordinates } = geometry;
  let kms = distance / 1000;
  kms = Math.round(kms * 100);
  kms /= 100;
  let minutes = Math.floor(duration / 60);

  let bounds = new LngLatBounds(ubicacion, ubicacion);
  for (const coord of coordinates) {
    bounds.extend(coord);
  }
  map.fitBounds(bounds, { padding: 200 });
  /**
   * @type{mapboxgl.AnySourceData}
   */
  const sourceData = {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates,
          },
        },
      ],
    },
  };
  // remover direccion  si ya existe
  if (map.getLayer(routeid)) {
    map.removeLayer(routeid);
    map.removeSource(routeid);
  }
  routeid = "RouteString";
  map.addSource(routeid, sourceData);
  map.addLayer({
    id: routeid,
    type: "line",
    source: routeid,
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#3b82f6",
      "line-width": 3,
    },
  });
  return {
    minutes,
    kms,
  };
}
