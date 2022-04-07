const { upload } = require("../config/multer");
const { getCoches, postCoches } = require("../controllers/coches");

const router = require("express").Router();

router.get("/", getCoches);
router.post("/", upload.single("img"), postCoches);

module.exports = router;
