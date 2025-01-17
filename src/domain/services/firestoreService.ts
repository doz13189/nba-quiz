import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

initializeApp({
  apiKey: "AIzaSyArkXyqsAEcABfGP3BEyP-9YpYsdr-lVEo",
  authDomain: "nba-quiz-23.firebaseapp.com",
  projectId: "nba-quiz-23",
  storageBucket: "nba-quiz-23.appspot.com",
  messagingSenderId: "760528421177",
  appId: "1:760528421177:web:cd84d034005b144fe1e8e8",
  measurementId: "G-6V6YLT3K22"
});

const firestoreProductionConfig = getFirestore();
type firestoreType = typeof firestoreProductionConfig

import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  QueryDocumentSnapshot,
  DocumentData
} from "firebase/firestore";


class firestoreService {

  private _firestore: firestoreType

  constructor(firestore: firestoreType) {
    this._firestore = firestore
  }

  async addDocument(document: string, documentObject: Object) {

    try {
      await addDoc(collection(this._firestore, document), documentObject)
      // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

  }

  async setDocument(document: string, documentId: string, collection: Object) {

    try {
      await setDoc(doc(this._firestore, document, documentId), collection, { merge: true })
    } catch (e) {
      console.error("Error adding document: ", e);
    }

  }

  async getDocument(document: string, key: string): Promise<any> {

    const docRef = doc(this._firestore, document, key);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      return docSnap.data()
    } else {
      // doc.data() will be undefined in this case
      // console.log("No such document!");
      return undefined
    }

  }
  
}


export {
  firestoreProductionConfig,
  firestoreService
}