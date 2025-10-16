import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);

  hide: boolean = true;
  username: string = '';
  email: string = '';
  password: string = '';

  async signInWithGoogle(): Promise<void> {
    await this.authService.signInWithGoogle();
  }

  async register() {
    if (this.email == '') {
      alert('Please enter email');
      return;
    }

    if (this.password == '') {
      alert('Please enter password');
      return;
    }

    if (this.username == '') {
      alert('Please enter username');
      return;
    }

    await this.authService.register(this.email, this.password, this.username);
  }
}

