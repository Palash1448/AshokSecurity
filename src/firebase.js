// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvCwGgrhsEYdhRA7pkxfXhxTNJUvzKdHA",
  authDomain: "ashoksecurity-cb796.firebaseapp.com",
  projectId: "ashoksecurity-cb796",
  storageBucket: "ashoksecurity-cb796.firebasestorage.app",
  messagingSenderId: "475696163286",
  appId: "1:475696163286:web:7ce0ba2268b54b10021c77",
  measurementId: "G-FXL7SZXT24"
};

// Initialize Firebase
let app, analytics, auth, db;

try {
  // Validate config before initialization
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    throw new Error('Firebase configuration is incomplete');
  }

  app = initializeApp(firebaseConfig);
  
  // Analytics disabled to prevent CSP violations
  // If you need analytics, ensure proper CSP headers are configured
  analytics = null;
  
  auth = getAuth(app);
  db = getFirestore(app);
  
  console.log('✅ Firebase initialized successfully');
  console.log('Project ID:', firebaseConfig.projectId);
  console.log('Auth Domain:', firebaseConfig.authDomain);
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
  console.error('Config:', {
    hasApiKey: !!firebaseConfig.apiKey,
    hasProjectId: !!firebaseConfig.projectId,
    hasAuthDomain: !!firebaseConfig.authDomain
  });
  
  // Create fallback objects to prevent import errors
  app = null;
  analytics = null;
  auth = null;
  db = null;
}

export { app, analytics, auth, db };