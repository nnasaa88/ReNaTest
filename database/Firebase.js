import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { useNetInfo } from "@react-native-community/netinfo";
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
const app = initializeApp(firebaseConfig);
export const db = getFirestore();

export function isnet() {
  const netinfo = useNetInfo();
  if (netinfo.isConnected) {
    return true;
  } else {
    return false;
  }
}

export async function getCloud(para1, para2) {
  const querySnapshot = await getDocs(collection(db, "items"));
  var data = [];
  var data1 = [];
  querySnapshot.forEach((doc) => {
    // if (doc.id === para2) {
    data.push({ docid: doc.id, ...doc.data() });
    // }
  });
  // data.map((l) => {
  //   data1.push(data.name);
  // });
  console.log(data);
  // console.log(data1);
}

export async function setCloud(para1, para2) {
  const docData = {
    name: "value",
    id: 1,
  };
  st = await addDoc(collection(db, para1), para2);
  return st;
  // console.log(st);
  // console.log(st.path.toString().split("/")[1]);
}
function updCloud(data, merge) {
  const myDoc = doc(db, "Users", "user");

  setDoc(myDoc, data, { merge: merge })
    .then(() => alert("updated " + data))
    .catch((e) => console.log(e));
}
async function delCloud(id) {
  await deleteDoc(doc(db, "items", "UhVdcnR9iH0MGMfkzwmG"));
}
