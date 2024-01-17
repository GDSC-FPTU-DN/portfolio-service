const multer = require("multer");

const multerConfig = {
  storage: multer.memoryStorage(),
};

module.exports = multerConfig;
