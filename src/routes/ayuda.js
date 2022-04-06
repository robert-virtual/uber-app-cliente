const { getayuda, postayuda } = require("../controllers/ayuda");

const router = require("express").Router();

router.get("/", getrayuda);

router.post("/", postayuda);

module.exports = router;