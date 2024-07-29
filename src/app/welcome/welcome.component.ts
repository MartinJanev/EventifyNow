import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../user';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  @Input() user!: User;
  isSignedIn: boolean = false;

  constructor() {
    this.isSignedIn = false;
  }
}
