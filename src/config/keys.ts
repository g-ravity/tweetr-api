import { Keys } from '../types';

const keys: Keys = {
  port: process.env.PORT || 4000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  accessTokenSecret: process.env.ACCESS_SECRET_KEY,
  firebaseStorageBucket: process.env.FB_STORAGE_BUCKET,
  firebaseStorageUrl: process.env.FB_STORAGE_BASE_URL,
  firebaseToken: process.env.FB_TOKEN,
  fbType: process.env.FB_TYPE,
  fbProjectId: process.env.FB_PROJECT_ID,
  fbPrivateKeyId: process.env.FB_PRIVATE_KEY_ID,
  fbPrivateKey: process.env.FB_PRIVATE_KEY,
  fbClientEmail: process.env.FB_CLIENT_EMAIL,
  fbClientId: process.env.FB_CLIENT_ID,
  fbAuthUri: process.env.FB_AUTH_URI,
  fbTokenUri: process.env.FB_TOKEN_URI,
  fbAuthProvider: process.env.FB_AUTH_PROVIDER_CERT,
  fbClientCert: process.env.FB_CLIENT_CERT,
  fbDatabaseUrl: process.env.FB_DATABASE_URL
};

export default keys;
