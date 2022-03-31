// const { Marker, Popup, Map } = require("mapbox-gl");
const { Marker, Popup, Map } = mapboxgl;
const d = document;
const btnMiUbicacion = d.getElementById("btn-mi-ubicacion");
const searchBar = d.getElementById("search-bar");
const searchrResults = d.getElementById("search-results");
let map;

const mapStyles = [
  "mapbox://styles/mapbox/navigation-day-v1",
  "mapbox://styles/mapbox/streets-v11",
];
let ubicacion = {};
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
      res = await res.json();
      console.log(res);
      searchrResults.innerHTML = "";

      res.features.forEach(createResult);
      searchrResults.classList.remove("hidden");
      if (!res.features.length) {
        createResult({
          text: "No se encontrarn resultados",
          place_name_es: target.value,
        });
      }
    }, 500);
  };
}

let markadorPrevio;
function crearMarcador({ lat, lng }) {
  if (markadorPrevio) {
    markadorPrevio.remove();
  }

  markadorPrevio = new Marker({
    color: "#00dbc5",
  })
    .setLngLat({ lat, lng })
    .addTo(map);
  map.flyTo({
    center: { lat, lng },
    zoom: 15,
  });
}

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
    t.content.querySelector("div").onclick = () => {
      console.log(center);
      crearMarcador({ lat: center[1], lng: center[0] });
    };
  }
  searchrResults.append(t.content);
}
