import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import routeConfig from './app/routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

bootstrapApplication(AppComponent, {
  providers:[
    provideRouter(routeConfig), provideFirebaseApp(() => initializeApp({"projectId":"event-management-system-99c7f","appId":"1:194301657901:web:78d5d394fdd9079f7a09a4","storageBucket":"event-management-system-99c7f.appspot.com","apiKey":"AIzaSyCVf3vZyj3CBXU8y3Sw_fLC1UceRsBZr1A","authDomain":"event-management-system-99c7f.firebaseapp.com","messagingSenderId":"194301657901"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
  ]
  
}).catch((err) => console.error(err));
