const { getCoches, postCoches } = require("../controllers/coches");

const router = require("express").Router();

router.get("/", getCoches);
router.get("/", postCoches);

module.exports = router;
