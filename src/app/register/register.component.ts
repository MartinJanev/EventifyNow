import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { GoogleAuthProvider,getAuth,signInWithPopup } from 'firebase/auth';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule, FormsModule,MatInputModule,MatButtonModule,MatIconModule,MatFormFieldModule,MatDividerModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  provider: GoogleAuthProvider;
  authService = inject(AuthService);
  hide: boolean = true;

  username : string = '';
  email : string = '';
  password : string = '';

  constructor(private router:Router){
  this.provider = new GoogleAuthProvider();
  this.provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  }

  signInWithGoogle(): void { // Google Sign-in
    signInWithPopup(getAuth(), this.provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential ? credential.accessToken : null;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      this.router.navigate(['/home']);
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
  
  register() {

    if(this.email == '') {
      alert('Please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }

    if(this.username == '') {
      alert('Please enter username');
      return;
    }

    this.authService.register(this.email, this.password, this.username);
  }
}