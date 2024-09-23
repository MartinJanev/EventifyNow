import { Component,inject,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ServiceEventService } from '../services/service-event.service';
import { AuthService } from '../services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule, FormsModule,MatInputModule,MatButtonModule,MatIconModule,MatFormFieldModule,MatDividerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  provider: GoogleAuthProvider;
  eventService = inject(ServiceEventService)

  constructor(private router: Router) {
    this.provider = new GoogleAuthProvider();
    this.provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  }

  auth: any;

  ngOnInit(): void {
    this.auth = getAuth();
  }

  signInWithGoogle(): void { // Google Sign-in
    signInWithPopup(this.auth, this.provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential ? credential.accessToken : null;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }

  email : string = '';
  password : string = '';

  //constructor(private auth:AuthService){}

  login() {

    if(this.email == '') {
      alert('Please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }

    //this.auth.login(this.email,this.password);
    
    this.email = '';
    this.password = '';
  }
}
/*
export class LoginComponent {

  eventService = inject(ServiceEventService)

    email: string = '';
    password: string = '';
  
    constructor(private authService: AuthService) {}
  
    login() {
      this.authService.login(this.email, this.password);
    }
}

*/