import { Component, inject,OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { ServiceEventService } from '../services/service-event.service';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule, FormsModule,MatInputModule,MatButtonModule,MatIconModule,MatFormFieldModule,MatDividerModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  username : string = '';
  email : string = '';
  password : string = '';

//  constructor(private auth:AuthService){}

  ngOnInit(): void {}
  
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
    
    this.email = '';
    this.password = '';
    this.username = '';
  }
}