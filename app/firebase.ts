import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDB1yyBKoTP2MHtbfzGpvoMPJGqF-Q_qso",
  authDomain: "airbnb-clone-407906.firebaseapp.com",
  projectId: "airbnb-clone-407906",
  storageBucket: "airbnb-clone-407906.appspot.com",
  messagingSenderId: "991596625396",
  appId: "1:991596625396:web:ac14b9ce3bc164f8628da1",
  measurementId: "G-S5W3F6CW6Z"
};

const app = initializeApp(firebaseConfig);
app.automaticDataCollectionEnabled = true;
const analytics = getAnalytics(app);


export {app, analytics};