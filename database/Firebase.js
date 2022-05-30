import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// import * as firebase from "firebase";

// import {db} from '../core/Config';
import {
  deleteDoc,
  doc,
  query,
  setDoc,
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7I8CaefxGEBm0bprbA-wYAW08OicQ_FM",

  // authDomain: "myngat-ace2c.firebaseapp.com",
  databaseURL: "https://myfirebase-nasaa88.firebaseio.com",
  projectId: "myfirebase-nasaa88",
  storageBucket: "myfirebase-nasaa88.appspot.com",
  messagingSenderId: "209414681595",
  appId: "1:209414681595:android:906e570b5bfe81ecde515e",
  // measurementId: "G-XZQ1TB0FD2",
};

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// } else {
//   firebase.app();
// }
const app = initializeApp(firebaseConfig);
export const db = getFirestore();

// export function myFirebase() {
//   async function Create() {
//     const docData = {
//       name: value,
//       role: 0,
//     };
//     await addDoc(collection(db, "items"), docData);
//     console.log(docData);
//   }
// }
export async function getCloud() {
  const querySnapshot = await getDocs(collection(db, "items"));
  var data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.color, ...doc.data() });
  });
  console.log(data);
}

export async function setCloud() {
  const docData = {
    name: "value",
    id: 1,
  };
  console.log(await addDoc(collection(db, "items"), docData));
}
function updCloud(data, merge) {
  const myDoc = doc(db, "Users", "user");

  setDoc(myDoc, data, { merge: merge })
    .then(() => alert("updated " + data))
    .catch((e) => console.log(e));
}
async function delCloud(id) {
  await deleteDoc(doc(db, "Users", "UhVdcnR9iH0MGMfkzwmG"));
}
