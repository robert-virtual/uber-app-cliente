const { getViajes, postViaje, updateViaje } = require("../controllers/viajes");

const router = require("express").Router();

router.get("/", getViajes);
router.post("/", postViaje);
router.post("/:id", updateViaje);

module.exports = router;
