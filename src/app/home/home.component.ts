import { Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDataComponent } from '../event-data/event-data.component';
import{ Eventdata } from '../../interface/event-data';
import { ServiceEventService } from '../services/service-event.service';
import { FooterComponent } from "../footer/footer.component";
import { RouterModule } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, EventDataComponent, FooterComponent, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./header.css', './card.css', './add-event.css']
})
export class HomeComponent {
  eventDataList: Eventdata[] = [];
  filteredDataList: Eventdata[] = [];
  eventService: ServiceEventService = inject(ServiceEventService);
  isAddEventVisible: boolean=false;
  private firestore: AngularFirestore | undefined;


  constructor() {
    this.eventDataList = this.eventService.getAllEvents();
    this.filteredDataList = this.eventDataList;
  }

  ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  openAdd() {
    this.isAddEventVisible = true;
    const addEventSection = document.querySelector('.add-event-section') as HTMLElement;
    if (addEventSection) {
      addEventSection.style.marginBottom = '0';
    }
    addEventSection.style.display = 'none';
  }
  closeAdd() {
    this.isAddEventVisible = false;
    const addEventSection = document.querySelector('.add-event-section') as HTMLElement;
    if (addEventSection) {
      addEventSection.style.marginBottom = '';
    }
    addEventSection.style.display = 'flex';
  }


  filterResults(text: string, city: string) {

    
    const results = document.querySelector('.results') as HTMLElement | null;
    const divAdder = document.querySelector('.add-event-section') as HTMLElement | null;
    const customAlert = document.createElement('div');
    const existingAlert = document.querySelector('.custom-alert') as HTMLElement | null;


    if (text && !city) {
      this.filteredDataList = this.eventDataList.filter((eventData) => 
      eventData?.name.toLowerCase().includes(text.toLowerCase())
      );
    } else if (!text && city) {
      this.filteredDataList = this.eventDataList.filter((eventData) => 
      eventData?.city.toLowerCase().includes(city.toLowerCase())
      );
    } else if (text && city) {
      this.filteredDataList = this.eventDataList.filter((eventData) => 
      eventData?.name.toLowerCase().includes(text.toLowerCase()) && 
      eventData?.city.toLowerCase().includes(city.toLowerCase())
      );
    } else {
      this.filteredDataList = this.eventDataList;
    }
    
    if (this.filteredDataList.length === 0) {
      if (results) results.style.display = 'none';
      if (divAdder && !(text && city)) divAdder.style.marginBottom = '15rem';
    
      if (!existingAlert) {
      customAlert.className = 'custom-alert';
      customAlert.innerText = 'No events found';
      customAlert.style.position = 'fixed';
      customAlert.style.top = '60%';
      customAlert.style.left = '51%';
      customAlert.style.transform = 'translate(-50%, -50%)';
      customAlert.style.backgroundColor = '#fff';
      customAlert.style.padding = '40px';
      customAlert.style.zIndex = '1000';
      customAlert.style.fontSize = '30px';
      customAlert.style.color = '#0042B6';
      customAlert.style.fontWeight = 'bold';
      document.body.appendChild(customAlert);
      } else {
      existingAlert.style.display = 'block';
      }
    } else {
      if (existingAlert) existingAlert.style.display = 'none';
      if (results) {
          if (divAdder)divAdder.style.marginBottom = '0';
        results.style.display = 'grid';
        results.style.paddingBottom = '3rem';
      
      // Add responsiveness for all screen sizes
      const updateGridStyles = () => {
        if (window.innerWidth <= 349) {
        results.style.gridTemplateColumns = '1fr';
        } else if (window.innerWidth <= 799) {
        results.style.gridTemplateColumns = 'repeat(1, 1fr)';
        results.style.padding = window.innerWidth >= 700 ? '0 6rem' : '1rem';
        } else if (window.innerWidth <= 1249) {
        results.style.gridTemplateColumns = 'repeat(2, 1fr)';
        results.style.padding = '0 4rem';
        results.style.columnGap = '20px';
        } else if (window.innerWidth <= 1500) {
        results.style.gridTemplateColumns = 'repeat(3, 1fr)';
        results.style.padding = '0 4rem';
        results.style.columnGap = '20px';
        results.style.rowGap = '20px';
        } else if (window.innerWidth <= 1920) {
        results.style.gridTemplateColumns = 'repeat(4, 1fr)';
        results.style.padding = '0 3rem';
        results.style.columnGap = '20px';
        results.style.rowGap = '30px';
        } else {
        results.style.gridTemplateColumns = 'repeat(5, 1fr)';
        results.style.padding = '2rem 5rem';
        results.style.columnGap = '30px';
        results.style.rowGap = '40px';
        }
        results.style.paddingBottom = '3rem';
      };
      
      updateGridStyles();
      
      window.addEventListener('resize', updateGridStyles);
      }
    }
  }

  event: Eventdata = {
    name: '',
    photo: '',
    startDate: new Date(),
    startTime: '',
    city: '',
    country: '',
    description: '',
    organizer: '',
    price: 0
  };
  addEvent() {
    // Generate an ID for the event
    // @ts-ignore
    const id = parseInt(this.firestore.createId());
    this.event.id = id;

    // Add event to Firestore
    // @ts-ignore
    this.firestore.collection('events').doc(id).set(this.event)
      .then(() => {
        console.log('Event successfully added!');
      })
      .catch((error: any) => {
        console.error('Error adding event: ', error);
      });
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
