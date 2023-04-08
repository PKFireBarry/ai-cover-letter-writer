import { initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClsKNp3O3y5Bgfk1NVACMD6KJlQ1208Gc",
  authDomain: "ai-coverletter-writer.firebaseapp.com",
  projectId: "ai-coverletter-writer",
  storageBucket: "ai-coverletter-writer.appspot.com",
  messagingSenderId: "216526666834",
  appId: "1:216526666834:web:74f7245859935e1152b38b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();



