import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireauth:AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore
  ) {}

  signInWithGoogle(){ // Google Sign-in
    return this.fireauth.signInWithPopup(new GoogleAuthProvider())
  }

  login(email: string, password: string){ //
    this.fireauth.signInWithEmailAndPassword(email, password).then( (res)=>{
      localStorage.setItem('token','true');
      if(res.user?.emailVerified == true){
        this.router.navigate(['/home']);
      }else{
        alert('Please verify your email address');
        this.router.navigate(['/verify-email']);
      }
    }, err=>{
      alert(err.message);
      this.router.navigate(['/login']);
    })
  }

  register(email: string, password: string, username: string){ 
    {
    this.fireauth.createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.firestore.collection('users').doc(username).set({
          email: email,
          username: username
        });
        alert('Registration successful');
        this.sendEmailVerification(res.user);
        this.router.navigate(['/login']);
      }, err=>{
        alert(err.message);
        this.router.navigate(['/register']);
      })
  }
}

  logout(){
    this.fireauth.signOut().then(()=>{
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err=>{
      alert(err.message);
    })
  }

  forgotPassword(email: string){
    this.fireauth.sendPasswordResetEmail(email).then(()=>{
      alert('Password reset email sent');
      this.router.navigate(['/verify-email']);
    }, err=>{
      alert(err.message);
    })
  }

  sendEmailVerification(user:any){
    user.sendEmailVerification().then((res:any)=>{
      alert('Email verification sent');
      this.router.navigate(['/verify-email']);
    }, (err:any)=>{
      alert(err.message);
    })
  }

}
