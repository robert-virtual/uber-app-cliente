const { getayuda, postayuda } = require("../controllers/ayuda");

const router = require("express").Router();

router.get("/", getayuda);

router.post("/", postayuda);

module.exports = router;