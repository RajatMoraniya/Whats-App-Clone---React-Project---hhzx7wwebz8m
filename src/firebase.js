import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA6jIJs_Nvg3vYbzHzWYinwOyBv0uFCHlA",
  authDomain: "project-whatsapp-clone-e77e3.firebaseapp.com",
  projectId: "project-whatsapp-clone-e77e3",
  storageBucket: "project-whatsapp-clone-e77e3.appspot.com",
  messagingSenderId: "154914170113",
  appId: "1:154914170113:web:1880716b0386a282726700",
};

const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const db = app.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();

export { auth, googleProvider };

export default db;
