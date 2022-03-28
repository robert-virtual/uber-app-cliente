const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("login", {
    titulo: "Login",
  });
});

router.post("/", (req, res) => {
  res.redirect("/");
});

// exportar router
module.exports = router;
