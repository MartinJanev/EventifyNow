import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ServiceEventService } from '../services/service-event.service';
import { Eventdata } from '../../interface/event-data';
import { FormControl,FormGroup,ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FooterComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute=inject(ActivatedRoute);
  eventService=inject(ServiceEventService);
  eventData: Eventdata | undefined;

  ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  constructor() {
    const id=Number(this.route.snapshot.params['id']);
    this.eventData=this.eventService.getEventById(id);
  }
}
