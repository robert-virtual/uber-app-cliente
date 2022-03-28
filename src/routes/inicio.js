const { inicio } = require("../controllers/inicio");

const router = require("express").Router();

router.get("/", inicio);

module.exports = router;
