const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", (req, res) => {
  res.redirect("/");
});

// exportar router
module.exports = router;
