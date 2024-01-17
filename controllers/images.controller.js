const { MemberStorage } = require("../models/member.model");

const uploadImage = async (file) => {
  const fullPath = await MemberStorage.upload(file.originalname, file.buffer);
  const imageUrl = await MemberStorage.download(fullPath);
  return {
    fullPath,
    imageUrl,
  };
};

const downloadImage = async (fullPath) => {
  return await MemberStorage.download(fullPath);
};

const deleteImage = async (fullPath) => {
  await MemberStorage.delete(fullPath);
};

module.exports = {
  uploadImage,
  downloadImage,
  deleteImage,
};
