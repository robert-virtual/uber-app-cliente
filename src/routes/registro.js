const { getregistro, postregistro } = require("../controllers/registro");

const router = require("express").Router();

router.get("/", getregistro);

router.post("/", postregistro);

// exportar router
module.exports = router;
