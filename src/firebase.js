import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB4tuyO41WlnpCTm9ZSDb_Oo3qKml1U1NM",
  authDomain: "instagram-clone-b4e79.firebaseapp.com",
  projectId: "instagram-clone-b4e79",
  storageBucket: "instagram-clone-b4e79.appspot.com",
  messagingSenderId: "485617357575",
  appId: "1:485617357575:web:bbf720a4388536972b2ba2",
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };
