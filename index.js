var firebase = require("firebase");

var app = firebase.initializeApp({
    apiKey: "AIzaSyBW2L5z1a8_ES4wFSD0kU8fdk3WL4IMMYM",
    authDomain: "telas-b819a.firebaseapp.com",
    databaseURL: "https://telas-b819a.firebaseio.com",
    projectId: "telas-b819a",
    storageBucket: "telas-b819a.appspot.com",
    messagingSenderId: "1049847880929",
    appId: "1:1049847880929:web:6e3d3787d8d499ea74eba0",
    measurementId: "G-EWJ9P42ZMR"
});

//firebase.initializeApp(app);
var dbRef = firebase.database().ref("users");

dbRef.orderByChild("email").equalTo('email@gmail.com').on("child_added", () => {
    dbRef.orderByChild("password").equalTo('aaa').on("child_added", (snap) => {
      console.log(snap.val());
    });
});