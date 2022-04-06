const { __prod__ } = require("../constantes");

exports.getMapa = (req, res) => {
  if (__prod__ && !req.session.userid) {
    res.redirect("/login");
    return;
  }
  res.render("mapa", {
    titulo: "Mapa",
  });
};
