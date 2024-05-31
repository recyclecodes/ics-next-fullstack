import admin from 'firebase-admin';
import path from 'path';
import { readFileSync } from 'fs';

const serviceAccountPath = path.resolve( './utils/firebase/serviceAccountKey');

const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf-8'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const getAccessToken = async () => {
  const token = await admin.credential.applicationDefault().getAccessToken();
  return token.access_token;
};

export { getAccessToken };
