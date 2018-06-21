import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB6LOf1F3z7U320ameC2-iWprTDJ0d1H74",
  authDomain: "nat-pagles-seafood-market.firebaseapp.com",
  databaseURL: "https://nat-pagles-seafood-market.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

// named export
export { firebaseApp }

// default export
export default base; 