import { Injectable, inject } from '@angular/core';
import { Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  user
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);
  private firestore = inject(Firestore);
  private toastService = inject(ToastService);

  user$: Observable<User | null>;

  constructor() {
    this.user$ = user(this.auth);
  }

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    try {
      const result = await signInWithPopup(this.auth, provider);
      localStorage.setItem('token', 'true');
      this.router.navigate(['/events']);
      return result;
    } catch (error: any) {
      this.toastService.showError(error.message);
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password);
      localStorage.setItem('token', 'true');

      if (result.user?.emailVerified) {
        this.router.navigate(['/events']);
      } else {
        this.toastService.showError('Please verify your email address');
        this.router.navigate(['/auth/verify-email']);
      }
    } catch (error: any) {
      this.toastService.showError(error.message);
      this.router.navigate(['/auth/login']);
    }
  }

  async register(email: string, password: string, username: string) {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, email, password);

      // Store user data in Firestore
      const userDoc = doc(this.firestore, 'users', result.user.uid);
      await setDoc(userDoc, {
        email: email,
        username: username,
        createdAt: new Date()
      });

      await this.sendEmailVerification(result.user);
      this.toastService.showSuccess('Registration successful! Please check your email for verification.');
      this.router.navigate(['/auth/login']);
    } catch (error: any) {
      this.toastService.showError(error.message);
      this.router.navigate(['/auth/register']);
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      localStorage.removeItem('token');
      this.router.navigate(['/auth/login']);
    } catch (error: any) {
      this.toastService.showError(error.message);
    }
  }

  async forgotPassword(email: string) {
    try {
      await sendPasswordResetEmail(this.auth, email);
      this.toastService.showSuccess('Password reset email sent! Please check your inbox.');
      this.router.navigate(['/auth/verify-email']);
    } catch (error: any) {
      this.toastService.showError(error.message);
    }
  }

  async sendEmailVerification(user: User) {
    try {
      await sendEmailVerification(user);
      this.router.navigate(['/auth/verify-email']);
    } catch (error: any) {
      this.toastService.showError(error.message);
    }
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') === 'true';
  }
}
