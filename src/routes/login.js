const { login } = require("../controllers/login");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("login", {
    titulo: "Login",
  });
});

router.post("/", login)

// exportar router
module.exports = router;
