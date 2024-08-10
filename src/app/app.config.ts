import { ApplicationConfig } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCVf3vZyj3CBXU8y3Sw_fLC1UceRsBZr1A",
    authDomain: "event-management-system-99c7f.firebaseapp.com",
    projectId: "event-management-system-99c7f",
    storageBucket: "event-management-system-99c7f.appspot.com",
    messagingSenderId: "194301657901",
    appId: "1:194301657901:web:78d5d394fdd9079f7a09a4"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
}