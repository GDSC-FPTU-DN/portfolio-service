const {
  collection,
  doc,
  getDoc,
  getDocs,
  getDocsFromCache,
  query,
  where,
  onSnapshot,
  addDoc,
  setDoc,
  deleteDoc,
} = require("firebase/firestore");
const { db } = require("../configs/firebase.config");

class FirebaseSchema {
  constructor(collectionName, schema) {
    this.collectionName = collectionName;
    this.converter = {
      toFirestore: (obj) => {
        const newObj = schema.fromObject(obj).toObject();
        return newObj;
      },
      fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return schema.fromObject(data);
      },
    };
    this.collection = collection(db, collectionName).withConverter(
      this.converter,
    );
  }

  async _getDoc(id) {
    // const cacheValue = await getFromCache(id)
    // if (cacheValue) {
    //     console.log(`Cache hit from ${id}`)
    //     return cacheValue
    // }
    // console.log(`Cache miss from ${id}`)
    const docRef = doc(this.collection, id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      const docData = snapshot.data();
      // setFromCache(id, docData)
      return docData;
    }
    return null;
  }

  async _getDocs() {
    const snapshots = await getDocsFromCache(this.collection);
    if (snapshots.size === 0) {
      // console.log("Cache miss")
      return await getDocs(this.collection);
    }
    return snapshots;
  }

  async getAll() {
    const snapshots = await this._getDocs();
    const returnDocuments = [];
    snapshots.forEach((doc) => {
      returnDocuments.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return returnDocuments;
  }

  async getById(id) {
    return await this._getDoc(id);
  }

  async _queryData(key, value, operator) {
    const documentQuery = query(this.collection, where(key, operator, value));
    const snapshots = await getDocs(documentQuery);
    const returnDocuments = [];
    snapshots.forEach((doc) => {
      returnDocuments.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return returnDocuments;
  }

  async queryEqual(key, value) {
    return await this._queryData(key, value, "==");
  }

  async queryArrayContains(key, value) {
    return await this._queryData(key, value, "array-contains");
  }

  onUpdate(id, callback) {
    return onSnapshot(doc(this.collection, id), callback);
  }

  async create(data) {
    const docRef = await addDoc(this.collection, data);
    return {
      id: docRef.id,
      ...data,
    };
  }

  async update(id, data) {
    await setDoc(doc(this.collection, id), data, { merge: true });
    return {
      id: id,
      ...data,
    };
  }

  async delete(id) {
    await deleteDoc(doc(this.collection, id));
  }
}

module.exports = FirebaseSchema;
