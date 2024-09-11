import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDataComponent } from '../event-data/event-data.component';
import{ Eventdata } from '../../interface/event-data';
import { ServiceEventService } from '../services/service-event.service';
import { FooterComponent } from "../footer/footer.component";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, EventDataComponent, FooterComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './header.css', './card.css']
})
export class HomeComponent {
  eventDataList: Eventdata[] = [];
  filteredDataList: Eventdata[] = [];
  eventService: ServiceEventService = inject(ServiceEventService);


  constructor() {
    this.eventDataList = this.eventService.getAllEvents();
    this.filteredDataList = this.eventDataList;
  }

  filterResults(text: string) {
    if(!text){
      this.filteredDataList = this.eventDataList;
      return;
    }

    this.filteredDataList = this.eventDataList.filter((eventData) =>
      eventData?.city.toLowerCase().includes(text.toLowerCase()) ||
      eventData?.name.toLowerCase().includes(text.toLowerCase())
    );
  }
  
}
