const admin = require('firebase-admin');
const serviceAccount = require('./fireBaseKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
