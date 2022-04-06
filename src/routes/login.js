const { login } = require("../controllers/login");

const router = require("express").Router();

router.get("/", (req, res) => {
  const { tipo } = req.query;
  if (!tipo) {
    return res.redirect("/");
  }
  res.render("login", {
    titulo: "Login",
    tipo,
  });
});

router.post("/", login);

// exportar router
module.exports = router;
