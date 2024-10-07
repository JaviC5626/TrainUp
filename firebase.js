// firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCXjz5S3yILrWD2JTj61wbTzdDdWl-MrDE",
    authDomain: "trainup-bae54.firebaseapp.com",
    projectId: "trainup-bae54",
    storageBucket: "trainup-bae54.appspot.com",
    messagingSenderId: "828197687456",
    appId: "1:828197687456:web:6fa7381cddf716b6d0b9c5",
    measurementId: "G-KM6DVYBYT7"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
