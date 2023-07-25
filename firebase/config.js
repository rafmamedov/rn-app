import * as firebase from "firebase";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCT7Y3pmfJwswC_4qBsrOCCVFT3DDjNpTg",
  authDomain: "react-native-app-6a069.firebaseapp.com",
  projectId: "react-native-app-6a069",
  storageBucket: "react-native-app-6a069.appspot.com",
  messagingSenderId: "791729338455",
  appId: "1:791729338455:web:671329dce2d19bba8c4b12",
  //   measurementId: "G-9CMQXQS8G3",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
