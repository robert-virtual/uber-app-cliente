const uuid = require("uuid").v4;
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./uploads");
  },
  filename(req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, `${uuid()}${ext}`);
  },
});

exports.upload = multer({ storage });
