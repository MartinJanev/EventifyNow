import { Component,inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { Router,RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterModule,FormsModule,MatInputModule,MatButtonModule,MatIconModule,MatFormFieldModule,MatDividerModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  email : string = '';
  hide: boolean = true;

  authService = inject(AuthService)

  forgotPass() {
    this.authService.forgotPassword(this.email);
    this.email = '';
  }

}
