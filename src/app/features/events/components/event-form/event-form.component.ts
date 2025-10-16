import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Event } from '../../../../core/models/event.model';
import { EventsDataService } from '../../../../core/services/events-data.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css'
})
export class EventFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private eventsService = inject(EventsDataService);
  private toastService = inject(ToastService);

  isNewEvent = true;
  eventId: string | null = null;

  // Form fields
  name = '';
  photo = '';
  startDate: Date = new Date();
  startTime = '';
  city = '';
  country = '';
  description = '';
  organizer = '';
  price = 0;

  submitting = false;

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isNewEvent = false;
      this.eventId = id;
      this.loadEvent(id);
    }
  }

  private loadEvent(id: string): void {
    this.eventsService.getEventById(id).subscribe({
      next: (event) => {
        if (event) {
          this.name = event.name;
          this.photo = event.photo;
          this.startDate = new Date(event.startDate);
          this.startTime = event.startTime;
          this.city = event.city;
          this.country = event.country;
          this.description = event.description;
          this.organizer = event.organizer;
          this.price = event.price;
        }
      },
      error: (error) => {
        console.error('Error loading event:', error);
        this.toastService.showError('Error loading event');
      }
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.photo = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async onSubmit(): Promise<void> {
    if (!this.validateForm()) {
      this.toastService.showError('Please fill all required fields');
      return;
    }

    this.submitting = true;

    const eventData: Partial<Event> = {
      name: this.name,
      photo: this.photo,
      startDate: this.startDate,
      startTime: this.startTime,
      city: this.city,
      country: this.country,
      description: this.description,
      organizer: this.organizer,
      price: this.price
    };

    try {
      if (this.isNewEvent) {
        await this.eventsService.addEvent(eventData);
        this.toastService.showSuccess('Event created successfully!');
      } else if (this.eventId) {
        await this.eventsService.updateEvent(this.eventId, eventData);
        this.toastService.showSuccess('Event updated successfully!');
      }
      this.router.navigate(['/events']);
    } catch (error) {
      console.error('Error saving event:', error);
      this.toastService.showError('Error saving event');
    } finally {
      this.submitting = false;
    }
  }

  private validateForm(): boolean {
    return !!(this.name && this.city && this.country &&
              this.description && this.organizer && this.photo);
  }

  goBack(): void {
    this.router.navigate(['/events']);
  }
}
