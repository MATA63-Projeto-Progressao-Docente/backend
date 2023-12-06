/* eslint-disable import/no-extraneous-dependencies */
import { File } from 'buffer';
import { initializeApp } from 'firebase/app';
import {
  getDownloadURL, getStorage, ref, uploadBytes,
} from 'firebase/storage';

const app = initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'limao-fb.firebaseapp.com',
  projectId: 'limao-fb',
  storageBucket: 'limao-fb.appspot.com',
  messagingSenderId: '247581653195',
  appId: '1:247581653195:web:b70a9b43c95f7ce915c34e',
});

// eslint-disable-next-line import/prefer-default-export
export async function uploadDocument(file: File) {
  const storage = getStorage(app);

  const filePath = `documents/${file.name}`;
  const documentRef = ref(storage, filePath);

  const result = await uploadBytes(documentRef, file);

  return getDownloadURL(result.ref);
}
