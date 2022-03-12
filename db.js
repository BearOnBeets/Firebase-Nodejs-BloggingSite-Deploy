
const firebase = require('firebase');
const config = require('./config');

const db = firebase.initializeApp(config.firebaseConfig);

var admin = require("firebase-admin");
var serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://assignment-b0f70-default-rtdb.firebaseio.com"
});


module.exports = {db,admin};

