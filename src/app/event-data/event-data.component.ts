import { Component, Input } from '@angular/core';
import { Eventdata } from '../../interface/event-data';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-event-data',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event-data.component.html',
  styleUrls: ['./event-data.component.css']
})
export class EventDataComponent {
  @Input() eventData!: Eventdata;

  constructor(private router: Router) {}

  navigateEventWithDelay(id: Number) {
    setTimeout(() => {
      this.router.navigate(['/details', id]);
    }, 300);
  }
}
