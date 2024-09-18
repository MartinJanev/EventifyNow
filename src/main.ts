import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import routeConfig from './app/routes';
import { appConfig } from './app/app.config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers:[
    provideRouter(routeConfig),
    appConfig.providers, provideAnimationsAsync('noop'),
  ]
}).catch((err) => console.error(err));
