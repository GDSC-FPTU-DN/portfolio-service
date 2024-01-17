const { storage } = require("../configs/firebase.config");
const {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");

class StorageSchema {
  constructor(folderName, metadata) {
    this.folderName = folderName;
    this.ref = ref(storage, folderName);
    this.metadata = metadata;
  }

  _getFileRef(path) {
    if (path.includes(`${this.folderName}/`)) {
      return ref(storage, path);
    }
    return ref(storage, `${this.folderName}/${path}`);
  }

  async upload(path, file) {
    const fileRef = this._getFileRef(path);
    await uploadBytes(fileRef, file, this.metadata);
    return fileRef.fullPath;
  }

  async download(path) {
    const fileRef = this._getFileRef(path);
    return await getDownloadURL(fileRef);
  }

  async delete(path) {
    const fileRef = this._getFileRef(path);
    await deleteObject(fileRef);
  }
}

module.exports = StorageSchema;
