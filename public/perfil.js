const d = document;

const img = d.getElementById("img");
const imgPerfil = d.getElementById("img-perfil");
img.onchange = (e) => {
  imgPerfil.src = URL.createObjectURL(e.target.files.item(0));
};
