import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventFormComponent } from '../../components/event-form/event-form.component';

@Component({
  selector: 'app-event-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, EventFormComponent],
  template: `
    <app-event-form></app-event-form>
  `,
  styles: []
})
export class EventEditComponent {
}
