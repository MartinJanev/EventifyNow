import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthUserService } from './core/services/auth-user.service';
import { ToastService } from './core/services/toast.service';
import { SeedDataService } from './core/services/seed-data.service';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class App implements OnInit {
  protected readonly title = signal('event-management-system');
  protected readonly status = signal('checking...');

  private authService = inject(AuthUserService);
  private toastService = inject(ToastService);
  private seedDataService = inject(SeedDataService);

  readonly currentUser$ = this.authService.currentUser$;
  readonly toasts$ = this.toastService.toasts$;

  async ngOnInit() {
    // Seed dummy data on first load (only runs once)
    try {
      await this.seedDataService.seedEvents();
    } catch (error) {
      console.error('Error seeding data:', error);
    }
  }

  async signOut(): Promise<void> {
    await this.authService.signOut();
  }

  dismissToast(id: string): void {
    this.toastService.dismiss(id);
  }
}
