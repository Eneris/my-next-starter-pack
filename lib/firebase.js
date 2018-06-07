import Firebase from 'firebase'
import config from '../config'

if (!Firebase.apps.length) {
  Firebase.initializeApp({
    apiKey: config.firebase.FB_API_KEY,
    authDomain: config.firebase.FB_AUTH_DOMAIN,
    databaseURL: config.firebase.FB_DATABASE_URL,
    projectId: config.firebase.FB_PROJECT_ID,
    storageBucket: config.firebase.FB_STORAGE_BUCKET,
    messagingSenderId: config.firebase.FB_MESSAGING_SENDER_ID
  })
}

export default Firebase
