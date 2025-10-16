const fs = require('fs');
const path = require('path');

// Load .env file
require('dotenv').config();

// Create environment.ts content
const environmentContent = `// This file is auto-generated. Do not edit manually.
// Run 'npm run set-env' to regenerate from .env file

export const firebaseConfig = {
  apiKey: '${process.env.FIREBASE_API_KEY}',
  authDomain: '${process.env.FIREBASE_AUTH_DOMAIN}',
  projectId: '${process.env.FIREBASE_PROJECT_ID}',
  storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET}',
  messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID}',
  appId: '${process.env.FIREBASE_APP_ID}',
};

export const environment = {
  production: false,
  firebase: firebaseConfig,
};
`;

// Create environment.prod.ts content
const environmentProdContent = `// This file is auto-generated. Do not edit manually.
// Run 'npm run set-env' to regenerate from .env file

export const firebaseConfig = {
  apiKey: '${process.env.FIREBASE_API_KEY}',
  authDomain: '${process.env.FIREBASE_AUTH_DOMAIN}',
  projectId: '${process.env.FIREBASE_PROJECT_ID}',
  storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET}',
  messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID}',
  appId: '${process.env.FIREBASE_APP_ID}',
};

export const environment = {
  production: true,
  firebase: firebaseConfig,
};
`;

// Write files
const envPath = path.join(__dirname, 'src', 'environments', 'environment.ts');
const envProdPath = path.join(__dirname, 'src', 'environments', 'environment.prod.ts');

fs.writeFileSync(envPath, environmentContent);
fs.writeFileSync(envProdPath, environmentProdContent);

console.log('✓ Environment files generated successfully from .env');
console.log('✓ environment.ts');
console.log('✓ environment.prod.ts');

