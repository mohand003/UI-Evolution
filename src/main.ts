import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './app/components/header.component';
import { HomeComponent } from './app/components/home.component';
import { FeaturesComponent } from './app/components/features.component';
import { FooterComponent } from "./app/components/footer.component";
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `
})
export class App {
  name = 'UI Generator';
}

bootstrapApplication(App, {
  providers: [provideHttpClient(),
    provideRouter(routes)]
});