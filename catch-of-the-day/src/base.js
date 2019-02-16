import Rebase from 're-base'
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp ({
    apiKey: "AIzaSyCBV6N11929L-v_2cvylTFUsiyW0tuDHAc",
    authDomain: "catch-of-the-day-ross-2b472.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-ross-2b472.firebaseio.com",
  }
)

const base = Rebase.createClass(firebaseApp.database())

export { firebaseApp }
export default base