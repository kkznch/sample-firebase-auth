import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  signInWithRedirect,
  getAuth,
  getRedirectResult,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const emulatorUrl = import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_URL;
if (emulatorUrl) {
  console.log('Run with emulator');
  import('firebase/auth').then(({ connectAuthEmulator }) => {
    connectAuthEmulator(auth, emulatorUrl);
  });
}

const provider = new GoogleAuthProvider();

try {
  const result = await getRedirectResult(auth);
  console.log('resultです', result);
} catch (e) {
  console.log('ここでキャッチ');
}

const signIn = async () => {
  try {
    await signInWithRedirect(auth, provider);
    console.log('リダイレクトされるのでここには入らない');
  } catch (e) {
    console.error('ここにも入らない');
  }
};

const button = document.getElementById('signin');
button.addEventListener('click', () => {
  signIn();
});
