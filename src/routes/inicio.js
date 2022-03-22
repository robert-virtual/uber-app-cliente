const router = require("express").Router();
const users = Array.from(Array(50), (e, i) => ({
  nombre: "Usuario " + i,
  apellido: "Aplellido " + i,
}));

router.get("/", (req, res) => {
  res.render("inicio", {
    nombre: "Hola mundo handlebars",
    users,
  });
});

module.exports = router;
