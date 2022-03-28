const users = Array.from(Array(50), (e, i) => ({
  nombre: "Usuario " + i,
  apellido: "Aplellido " + i,
}));

exports.inicio = (req, res) => {
  res.render("inicio", {
    titulo: "Inicio",
    nombre: "Hola mundo handlebars",
    users,
  });
};
