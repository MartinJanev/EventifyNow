import {Component, inject, Input} from '@angular/core';
import {Eventdata} from '../../interface/event-data';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ServiceEventService} from '../services/service-event.service';

@Component({
  selector: 'app-event-data',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event-data.component.html',
  styleUrls: ['./event-data.component.css']
})
export class EventDataComponent {
  @Input() eventData!: Eventdata;
  eventService = inject(ServiceEventService);

  constructor(private data: ServiceEventService) {}

  isAdmin() { // Check if user is admin

    const adminControl = document.querySelector('.listing-delete') as HTMLElement;
    if (this.eventService.isAdmin()) {
      adminControl.style.display = 'flex';
      return true;
    } else {
      adminControl.style.display = "none";
      return false;
    }
  }

  deleteEvent(event:Eventdata) { // Delete event
    if (window.confirm('Are you sure you want to delete the event '+event.name+'?')) {
      const customAlert = document.createElement('div');
      customAlert.style.opacity = '0';
      customAlert.style.transition = 'opacity 0.2s';
      document.body.appendChild(customAlert);
      requestAnimationFrame(() => {
        customAlert.style.opacity = '1';
      });
      customAlert.innerText = 'You have successfully deleted this event!';
      customAlert.style.position = 'fixed';
      customAlert.style.top = '10%';
      customAlert.style.left = '50%';
      customAlert.style.transform = 'translate(-50%, -50%)';
      customAlert.style.backgroundColor = '#fff';
      customAlert.style.padding = '40px';
      customAlert.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
      customAlert.style.zIndex = '1000';
      customAlert.style.fontSize = '20px';
      customAlert.style.color = '#0042B6';
      customAlert.style.fontWeight = 'bold';
      document.body.appendChild(customAlert);

      this.data.deleteEvent(event)

      setTimeout(() => {
        document.body.removeChild(customAlert);
      }, 2500); // Customize the duration as needed
    }
  }
}
