import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ServiceEventService } from '../service-event.service';
import { Eventdata } from '../event-data';
import { FormControl,FormGroup,ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute=inject(ActivatedRoute);
  eventService=inject(ServiceEventService);
  eventData: Eventdata | undefined;
  applyForm=new FormGroup({
    firstName:new FormControl(''),
    lastName:new FormControl(''),
    email:new FormControl(''),
  });

  constructor() {
    const id=Number(this.route.snapshot.params['id']);
    this.eventData=this.eventService.getEventById(id);
  }

  submitApplication(){
    this.eventService.submitApplication(
      this.applyForm.value.firstName??'',
      this.applyForm.value.lastName??'',
      this.applyForm.value.email??''
    );
  }
}
