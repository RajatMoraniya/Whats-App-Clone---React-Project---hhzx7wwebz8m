import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const firebaseConfig = {
    apiKey: "AIzaSyA6jIJs_Nvg3vYbzHzWYinwOyBv0uFCHlA",
    authDomain: "project-whatsapp-clone-e77e3.firebaseapp.com",
    projectId: "project-whatsapp-clone-e77e3",
    storageBucket: "project-whatsapp-clone-e77e3.appspot.com",
    messagingSenderId: "154914170113",
    appId: "1:154914170113:web:1880716b0386a282726700"
  };

  //this special line is for connect everything
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth , provider};
  export default db;