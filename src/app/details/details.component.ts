import { Component,inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceEventService } from '../services/service-event.service';
import { Eventdata } from '../../interface/event-data';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{
  route: ActivatedRoute=inject(ActivatedRoute);
  eventService=inject(ServiceEventService);
  eventData: Eventdata | undefined;
  router: Router=inject(Router);

  ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  constructor() {
    const id=Number(this.route.snapshot.params['id']);
    this.eventData=this.eventService.getEventById(id);
  }

  delayBack(){
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);  
  }
  
}
