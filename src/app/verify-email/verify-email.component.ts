import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css'
})
export class VerifyEmailComponent {

  constructor(private router: Router) {}
  goToLogin(){
    this.router.navigate(['/login']);
  }
}
