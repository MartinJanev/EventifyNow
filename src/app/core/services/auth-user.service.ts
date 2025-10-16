import { Injectable, inject } from '@angular/core';
import {
  Auth,
  User,
  authState,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from '@angular/fire/auth';
import { Observable, map } from 'rxjs';
import { UserSummary } from '../models/user.model';

/**
 * Authentication service.
 * Manages Firebase Auth state and user operations.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  private auth = inject(Auth);

  /** Observable of current auth state */
  readonly authState$: Observable<User | null> = authState(this.auth);

  /** Observable of current user summary */
  readonly currentUser$: Observable<UserSummary | null> = this.authState$.pipe(
    map((user) => (user ? this.mapUserToSummary(user) : null))
  );

  /**
   * Sign in with email and password.
   * @param email User email
   * @param password User password
   * @returns Promise resolving to user summary
   */
  async signIn(email: string, password: string): Promise<UserSummary> {
    const credential = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    return this.mapUserToSummary(credential.user);
  }

  /**
   * Create new user account.
   * @param email User email
   * @param password User password
   * @param displayName Optional display name
   * @returns Promise resolving to user summary
   */
  async signUp(
    email: string,
    password: string,
    displayName?: string
  ): Promise<UserSummary> {
    const credential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    if (displayName) {
      await updateProfile(credential.user, { displayName });
    }

    return this.mapUserToSummary(credential.user);
  }

  /**
   * Sign out current user.
   * @returns Promise that resolves when sign out completes
   */
  async signOut(): Promise<void> {
    await signOut(this.auth);
  }

  /**
   * Get current user synchronously.
   * @returns Current Firebase user or null
   */
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  /**
   * Check if user is authenticated.
   * @returns True if user is signed in
   */
  isAuthenticated(): boolean {
    return this.auth.currentUser !== null;
  }

  /**
   * Map Firebase User to UserSummary.
   * @param user Firebase User object
   * @returns UserSummary object
   */
  private mapUserToSummary(user: User): UserSummary {
    return {
      uid: user.uid,
      displayName: user.displayName || undefined,
      photoURL: user.photoURL || undefined,
      role: 'user', // TODO: Fetch from Firestore /users/{uid}
    };
  }
}

export type { Auth, User };
