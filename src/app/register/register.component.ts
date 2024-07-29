import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormGroup,ReactiveFormsModule,FormControl } from '@angular/forms';
import { ServiceEventService } from '../service-event.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  eventService = inject(ServiceEventService)

  registerForm = new FormGroup(
    {
      username: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    }
  )

  registerApp(){
     this.eventService.registerApp(
      this.registerForm.value.username ?? '',
      this.registerForm.value.email ?? '',
      this.registerForm.value.password ?? ''
     );
  }

}
