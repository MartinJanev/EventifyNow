import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormGroup,ReactiveFormsModule,FormControl } from '@angular/forms';
import { ServiceEventService } from '../service-event.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  eventService = inject(ServiceEventService)

  loginForm = new FormGroup(
    {
      username: new FormControl(''),
      password: new FormControl(''),
    }
  )

  loginApp(){
     this.eventService.loginApp(
      this.loginForm.value.username ?? '',
      this.loginForm.value.password ?? ''
     );
  }


}
