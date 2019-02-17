import firebase from 'firebase'

export const config = {
  apiKey: 'AIzaSyBA1vxFl_EqbijQ462sXU0QDoSYDN9KCqU',
  authDomain: 'vue-telescopes.firebaseapp.com',
  databaseURL: 'https://vue-telescopes.firebaseio.com',
  projectId: 'vue-telescopes',
  storageBucket: 'vue-telescopes.appspot.com',
  messagingSenderId: '902799989366'
}

firebase.initializeApp(config)

export function firebaseListener (func) {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      func(true, user)
    } else {
      func(false)
    }
  }, function (error) {
    console.log(error)
  })
}

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
export const firebaseRef = firebase
