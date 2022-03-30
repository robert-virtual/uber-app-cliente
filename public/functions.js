// const { Marker, Popup, Map } = require("mapbox-gl");
const { Marker, Popup, Map } = mapboxgl;
const d = document;
const btnMiUbicacion = d.getElementById("btn-mi-ubicacion");
const searchBar = d.getElementById("search-bar");
const searchrResults = d.getElementById("search-results");
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
    const map = new Map({
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

    setbtnMiUbicacion(map);
    setSearchBar();
  } catch (error) {
    removerLoader(error);
  }
  removerLoader();
}

function setbtnMiUbicacion(map) {
  btnMiUbicacion.classList.remove("hidden");
  btnMiUbicacion.onclick = () => {
    console.log("btnMiUbicacion");
    map.flyTo({
      center: ubicacion,
      zoom: 15,
    });
  };
}

function setSearchBar() {
  searchBar.classList.remove("hidden");
  searchBar.onkeyup = () => {
    const t = d.createElement("template");

    t.innerHTML = `
      <div class="search-result">
      Honduras tegucigalpa
    </div>
      `;
    searchBar.append(t.content);
  };
  searchrResults.classList.remove("hidden");
}
