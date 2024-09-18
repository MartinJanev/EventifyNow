import { Component, inject,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDataComponent } from '../event-data/event-data.component';
import{ Eventdata } from '../../interface/event-data';
import { ServiceEventService } from '../services/service-event.service';
import { FooterComponent } from "../footer/footer.component";
import { Router, RouterModule } from '@angular/router';
import { AddEventComponent } from "../add-event/add-event.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, EventDataComponent, FooterComponent, RouterModule, AddEventComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./header.css', './card.css']
})
export class HomeComponent {
  eventDataList: Eventdata[] = [];
  filteredDataList: Eventdata[] = [];
  eventService: ServiceEventService = inject(ServiceEventService);


  constructor() {
    this.eventDataList = this.eventService.getAllEvents();
    this.filteredDataList = this.eventDataList;
  }

  ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
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

/*
eventDataList: Eventdata[] = [];
/filteredDataList: Eventdata[] = [];


constructor (private eventService: ServiceEventService){}
ngOnInit(){
  this.eventService.getEvents().subscribe({
    next:(eventDataList) => this.eventDataList = eventDataList,
    error: (err) => console.error("Error fetching data",err)
  });
}
*/