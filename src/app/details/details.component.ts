import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {ServiceEventService} from '../services/service-event.service';
import {Eventdata} from '../../interface/event-data';
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, FooterComponent, RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  eventService = inject(ServiceEventService);
  eventData: Eventdata | undefined;
  router: Router = inject(Router);

  constructor() {
    const id = Number(this.route.snapshot.params['id']);
    this.eventData = this.eventService.getEventById(id);
  }

  ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

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

  deleteEvent() { // Delete event
    if (confirm('Are you sure you want to delete this event?')) {
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

      setTimeout(() => {
        document.body.removeChild(customAlert);
      }, 1500); // Customize the duration as needed
    }
  }

  attendEvent() { //RSVP for event
    const customAlert = document.createElement('div');
    customAlert.style.opacity = '0';
    customAlert.style.transition = 'opacity 0.2s';
    document.body.appendChild(customAlert);
    requestAnimationFrame(() => {
      customAlert.style.opacity = '1';
    });
    customAlert.innerText = 'You have successfully registered for this event!';
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

    setTimeout(() => {
      document.body.removeChild(customAlert);
    }, 1500); // Customize the duration as needed
  }

}
