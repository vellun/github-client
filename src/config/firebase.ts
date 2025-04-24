import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVne95xlEDlv_izoGgIOcgpSWfC67yIJE",
  authDomain: "github-client-c2136.firebaseapp.com",
  projectId: "github-client-c2136",
  storageBucket: "github-client-c2136.firebasestorage.app",
  messagingSenderId: "28944709507",
  appId: "1:28944709507:web:d2dcd5b6b105895762a8b6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
