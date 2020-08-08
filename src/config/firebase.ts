import * as firebase from 'firebase-admin';
import keys from './keys';

const params = {
  type: keys.fbType,
  projectId: keys.fbProjectId,
  privateKeyId: keys.fbPrivateKeyId,
  privateKey: keys.fbPrivateKey,
  clientEmail: keys.fbClientEmail,
  clientId: keys.fbClientId,
  authUri: keys.fbAuthUri,
  tokenUri: keys.fbTokenUri,
  authProviderX509CertUrl: keys.fbAuthProvider,
  clientC509CertUrl: keys.fbClientCert
};

firebase.initializeApp({
  credential: firebase.credential.cert(params),
  databaseURL: 'https://tweetr-api.firebaseio.com'
});

export default firebase.storage();
