import firebase from "firebase";

// firebase init goes here
const test_config = {
  apiKey: "AIzaSyD_sXWcodF9-oW8aFknYMHM7ysb7nZuRS0",
  authDomain: "cypress-test-env.firebaseapp.com",
  projectId: "cypress-test-env",
  storageBucket: "cypress-test-env.appspot.com",
  messagingSenderId: "128316009267",
  appId: "1:128316009267:web:4a6ddabba0e90a2b9c6c46",
};
const prod_config = {
  apiKey: "AIzaSyD9w4TODTiPPQfpArdhmwZaLmDZdqO6NOE",
  authDomain: "cypress-test-407ff.firebaseapp.com",
  projectId: "cypress-test-407ff",
  storageBucket: "cypress-test-407ff.appspot.com",
  messagingSenderId: "445603755748",
  appId: "1:445603755748:web:9d140769a63f22c3545ef1",
};

const config = {
  ...test_config,
};

firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;

// // date issue fix according to firebase
// const settings = {
//   timestampsInSnapshots: true,
// };
// db.settings(settings);

// firebase collections
const usersCollection = db.collection("users");
const postsCollection = db.collection("posts");
const commentsCollection = db.collection("comments");
const likesCollection = db.collection("likes");

export {
  db,
  auth,
  currentUser,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection,
};
