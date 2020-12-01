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

const dbRef = firebase.database().ref();

function cadastrar(){
    this.writeUserData(document.getElementById("nome").value, document.getElementById("sobrenome").value, document.getElementById("email").value, document.getElementById("senha").value);
}

function writeUserData(name, secondName, email, password) {
    var db = firebase.firestore();
    const firestore = firebase.firestore();
    const settings = {
        timestampsInSnapshots: true
    }
    firestore.settings(settings);

    uid = this.genereateUID()();
    firebase.database().ref('users/' + uid).set({
    username: name,
    secondName: secondName,
    email: email,
    password : password
    });
}

function login(email, password){
  var dbRef = firebase.database().ref("users");

  dbRef.orderByChild("email").equalTo(email).on("child_added", () => {
    dbRef.orderByChild("password").equalTo(password).on("child_added", (snap) => {
      console.log(snap.val());
        localStorage.setItem("user", JSON.stringify(snap.val()));
        window.location.href = "inicio.html";
    });
  });
}

function genereateUID(){
    // Modeled after base64 web-safe chars, but ordered by ASCII.
    var PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
  
    // Timestamp of last push, used to prevent local collisions if you push twice in one ms.
    var lastPushTime = 0;
  
    // We generate 72-bits of randomness which get turned into 12 characters and appended to the
    // timestamp to prevent collisions with other clients.  We store the last characters we
    // generated because in the event of a collision, we'll use those same characters except
    // "incremented" by one.
    var lastRandChars = [];
  
    return function() {
      var now = new Date().getTime();
      var duplicateTime = (now === lastPushTime);
      lastPushTime = now;
  
      var timeStampChars = new Array(8);
      for (var i = 7; i >= 0; i--) {
        timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
        // NOTE: Can't use << here because javascript will convert to int and lose the upper bits.
        now = Math.floor(now / 64);
      }
      if (now !== 0) throw new Error('We should have converted the entire timestamp.');
  
      var id = timeStampChars.join('');
  
      if (!duplicateTime) {
        for (i = 0; i < 12; i++) {
          lastRandChars[i] = Math.floor(Math.random() * 64);
        }
      } else {
        // If the timestamp hasn't changed since last push, use the same random number, except incremented by 1.
        for (i = 11; i >= 0 && lastRandChars[i] === 63; i--) {
          lastRandChars[i] = 0;
        }
        lastRandChars[i]++;
      }
      for (i = 0; i < 12; i++) {
        id += PUSH_CHARS.charAt(lastRandChars[i]);
      }
      if(id.length != 20) throw new Error('Length should be 20.');
  
      return id;
    };
  }