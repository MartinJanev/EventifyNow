import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDataComponent } from '../event-data/event-data.component';
import{ Eventdata } from '../event-data';
import { ServiceEventService } from '../service-event.service';
import { WelcomeComponent } from '../welcome/welcome.component';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, EventDataComponent, WelcomeComponent, HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  eventDataList: Eventdata[] = [];

  eventService: ServiceEventService = inject(ServiceEventService);

  constructor() {
    this.eventDataList = this.eventService.getAllEvents();
  }
}
