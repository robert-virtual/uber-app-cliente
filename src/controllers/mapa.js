const { __prod__ } = require("../constantes");
// __prod__ = valor boleano que indica
// si estamos en un entorno de produccion o no

exports.getMapa = (req, res) => {
  if (__prod__ && !req.session.userid) {
    // si estamos en produccion y no hay una session iniciada
    // redirigimos al usuario a el inicio ya que no tiene
    // permiso para acceder a esta pagina
    res.redirect("/");
    return;
  }
  res.render("mapa", {
    titulo: "Mapa",
    mapa: true,
  });
};
