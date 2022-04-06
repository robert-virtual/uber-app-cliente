const { login, logout } = require("../controllers/auth");

const router = require("express").Router();

router.get("/login", (req, res) => {
  const { tipo } = req.query;
  if (!tipo) {
    return res.redirect("/");
  }
  res.render("login", {
    titulo: "Login",
    tipo,
  });
});

router.post("/login", login);
router.get("/logout", logout);

// exportar router
module.exports = router;
