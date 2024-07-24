import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  ChangeLanguage(lang:any){
    const selectedLanguage = lang.target.value;
    if (selectedLanguage === 'macedonian') {
      this.router.navigate(['/mk']);
      document.documentElement.lang = selectedLanguage;
    }

    
  }
}
