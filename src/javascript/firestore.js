import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDt8mNCkPIEX250EWp43p53DVn1rkCP4vY",
  authDomain: "gametrackr-386408.firebaseapp.com",
  projectId: "gametrackr-386408",
  storageBucket: "gametrackr-386408.appspot.com",
  messagingSenderId: "177079470533",
  appId: "1:177079470533:web:ad161b5abca215b08ca3ac",
  measurementId: "G-NYYX1P9412"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// Add a document to a collection
export { db }; 

