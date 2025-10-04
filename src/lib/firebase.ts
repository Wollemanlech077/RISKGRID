// Firebase configuration
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_KrwxHAOzZPAFwhhiZ3WTE7cOQslkhMw",
  authDomain: "riskgrid-9f3f7.firebaseapp.com",
  projectId: "riskgrid-9f3f7",
  storageBucket: "riskgrid-9f3f7.firebasestorage.app",
  messagingSenderId: "932152803623",
  appId: "1:932152803623:web:2792670fc0173cb718e902",
  measurementId: "G-BPJ4KR9ZDD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
