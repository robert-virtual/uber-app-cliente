const { upload } = require("../config/multer");
const { getPerfil, postPerfil } = require("../controllers/perfil");

const router = require("express").Router();

router.get("/", getPerfil);
router.post("/", upload.single("img"), postPerfil);

module.exports = router;
