import firebase from 'firebase/app'
import 'firebase/storage'
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAeQSP8LM0kmm_FJuhXk5yvi-cK6Tt49H4",
  authDomain: "anjing-goblog.firebaseapp.com",
  databaseURL: "https://anjing-goblog.firebaseio.com",
  projectId: "anjing-goblog",
  storageBucket: "anjing-goblog.appspot.com",
  messagingSenderId: "532331564052",
  appId: "1:532331564052:web:513b69d96718b9fb6aab01"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  
  const storage = firebase.storage();
  export {
    storage, firebase as default
  }