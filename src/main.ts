import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes'
import { FeaturesComponent } from './app/components/features/features.component';
import { PricingComponent } from './app/components/pricing/pricing.component';
import { ContactComponent } from './app/components/contact/contact.component';
import { SignInComponent } from './app/components/sign-in/sign-in.component';
import { SignUpComponent } from './app/components/sign-up/sign-up.component';
import { GenerationComponent } from './app/components/generation/generation.component';
import { ProfileComponent } from './app/components/profile/profile.component';
import { HeaderComponent } from './app/components/header/header.component';
import { FooterComponent } from './app/components/footer/footer.component';
import { ThreeBackgroundComponent } from './app/three-background/three-background.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ThreeBackgroundComponent],
  template: `
    <app-header></app-header>
    <app-three-background></app-three-background>
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