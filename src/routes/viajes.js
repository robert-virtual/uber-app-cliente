const { getViajes, postViaje } = require("../controllers/viajes");

const router = require("express").Router();

router.get("/", getViajes);
router.post("/", postViaje);

module.exports = router;
