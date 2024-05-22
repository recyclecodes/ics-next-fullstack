import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyC0do7o_NFFjVbrIg_NWZBfRlsDidQiS68',
  authDomain: 'ics-next-fullstack.firebaseapp.com',
  projectId: 'ics-next-fullstack',
  storageBucket: 'ics-next-fullstack.appspot.com',
  messagingSenderId: '817769983520',
  appId: '1:817769983520:web:ac60d3e863ad25df3d9645',
  measurementId: 'G-6CTPC6V9P6',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyC0do7o_NFFjVbrIg_NWZBfRlsDidQiS68",
//   authDomain: "ics-next-fullstack.firebaseapp.com",
//   projectId: "ics-next-fullstack",
//   storageBucket: "ics-next-fullstack.appspot.com",
//   messagingSenderId: "817769983520",
//   appId: "1:817769983520:web:ac60d3e863ad25df3d9645",
//   measurementId: "G-6CTPC6V9P6"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
