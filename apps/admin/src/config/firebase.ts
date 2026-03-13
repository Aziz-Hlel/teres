// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDWKplAl5Vp43pG0j5j3vnThRJIPwv1E44',
  authDomain: 'uber-588cf.firebaseapp.com',
  projectId: 'uber-588cf',
  storageBucket: 'uber-588cf.firebasestorage.app',
  messagingSenderId: '371351638566',
  appId: '1:371351638566:web:16c040ae9fb03d5382cce7',
  measurementId: 'G-DH71YEDZKQ',
};

// Initialize Firebase app only once
const app = getApps()[0] || initializeApp(firebaseConfig);

// Initialize Analytics safely (optional)
if (typeof window !== 'undefined') {
  try {
    getAnalytics(app);
  } catch (err) {
    console.warn('Analytics not supported in this environment:', err);
  }
}

export const firebaseAuth = getAuth(app);
export default app;
