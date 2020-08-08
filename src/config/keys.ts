import { Keys } from '../types';

const keys: Keys = {
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  accessTokenSecret: process.env.ACCESS_SECRET_KEY,
  firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  firebaseStorageURL: process.env.FIREBASE_STORAGE_BASE_URL,
  firebaseToken: process.env.FIREBASE_TOKEN
};

export default keys;
