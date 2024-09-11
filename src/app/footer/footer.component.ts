import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <footer>
      <div class="footer-copy">
        <p>&copy; 2024 Event Management System. All rights reserved.</p>
      </div>
    </footer>
  `, 
  styles:[`
    footer{
        flex-direction: column;
        background-color: var(--primary-color);
        color: white;
        bottom: 0;
    }

    footer a:hover{
        background-color: var(--accent-color);
        color: var(--primary-color);
        transition: 0.4s ease-in-out;
    }


    .footer-copy{
        padding: 1.2rem;
        text-align: center;
    }
    .footer-logo a{
        color: white;
        text-decoration: none;
    }
    
    .footer-info{
      background-color: var(--primary-color);
        display: flex;
        justify-content: space-evenly;
        align-items: center; 
    }
    footer a{
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        padding: 10px;
        border-radius: 10px;
    }
  `]
})
export class FooterComponent {}
