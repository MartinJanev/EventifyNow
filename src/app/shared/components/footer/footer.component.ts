import {Component} from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <footer>
      <div class="footer-copy">
        <p>&copy; {{ currentYear }} EventifyNow. All rights reserved.</p>
      </div>
    </footer>
  `,
  styles: [`
    footer {
      background: var(--gradient-primary);
      color: white;
      width: 100%;
      margin-top: auto;
      box-shadow: 0 -2px 12px rgba(102, 126, 234, 0.2);
    }

    .footer-copy {
      max-width: 1400px;
      margin: 0 auto;
      padding: 1.5rem;
      text-align: center;
    }

    .footer-copy p {
      margin: 0;
      font-size: 0.95rem;
      color: white;
    }

    @media (max-width: 600px) {
      .footer-copy {
        padding: 1.25rem 1rem;
      }

      .footer-copy p {
        font-size: 0.875rem;
      }
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
