const { getMapa } = require("../controllers/mapa");

const router = require("express").Router();

router.get("/", getMapa);

module.exports = router;
