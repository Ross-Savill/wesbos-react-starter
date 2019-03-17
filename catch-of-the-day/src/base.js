import Rebase from 're-base'
import firebase from "firebase"
require('dotenv').config({ debug: process.env.DEBUG })

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  databaseURL: process.env.DATABASEURL
})
console.log(firebaseApp.AUTHDOMAIN)

const base = Rebase.createClass(firebaseApp.database())

export { firebaseApp }

export default base
