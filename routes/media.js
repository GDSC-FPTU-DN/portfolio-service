const express = require("express");
const {
  uploadImage,
  deleteImage,
  downloadImage,
} = require("../controllers/images.controller");
const responseObject = require("../utils/response");
const { APP_STRINGS } = require("../utils/constants");

const router = express.Router();

// Read media
router.post("/", async function (req, res, next) {
  const path = req.body.path;
  const imageUrl = await downloadImage(path);
  return res
    .status(200)
    .send(responseObject(imageUrl, APP_STRINGS.downloadFile(path)));
});

// Upload media
router.post("/upload", async function (req, res, next) {
  const file = req.file;
  if (!file) {
    return res.status(400).send(responseObject(null, `No file upload!`));
  }
  const data = await uploadImage(file);
  return res
    .status(200)
    .send(responseObject(data, APP_STRINGS.uploadFile(data.fullPath)));
});

// Delete media
router.post("/delete", async function (req, res, next) {
  const fullPath = req.body.path;
  await deleteImage(fullPath);
  return res
    .status(200)
    .send(responseObject(null, APP_STRINGS.deleteFile(fullPath)));
});

module.exports = router;
