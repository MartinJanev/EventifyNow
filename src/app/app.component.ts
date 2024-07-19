import { Component } from '@angular/core';
import { HomeComponent } from "./home/home.component";
import { RouterModule } from "@angular/router";
import { WelcomeComponent } from "./welcome/welcome.component";
import { HeaderComponent } from "./header/header.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, RouterModule, WelcomeComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'event-management-system';
}
