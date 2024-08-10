import { Component,Input } from '@angular/core';
import { Eventdata } from '../../interface/event-data';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-event-data',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './event-data.component.html',
  styleUrl: './event-data.component.css'
})
export class EventDataComponent {
  @Input() eventData!: Eventdata;
}
