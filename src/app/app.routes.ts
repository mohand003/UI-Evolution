import { Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { FeaturesComponent } from './components/features.component';
import { PricingComponent } from './components/pricing.component';
import { ContactComponent } from './components/contact.component';
import { SignInComponent } from './components/sign-in.component';
import { SignUpComponent } from './components/sign-up.component';
import { GenerationComponent } from './components/generation.component';
import { AboutComponent } from './components/about.component';


export const routes: Routes = [
  { path: '', redirectTo: '/home' ,pathMatch:'full'},
  { path: 'home', component: HomeComponent, title: "Home" },
  { path: 'about', component: AboutComponent, title: "About" },
  { path: 'features', component: FeaturesComponent, title: "Features" },
  { path: 'pricing', component: PricingComponent, title: "Pricing" },
  { path: 'contact', component: ContactComponent, title: "Contact" },
  { path: 'sign-in', component: SignInComponent, title: "SignIn" },
  { path: 'sign-up', component: SignUpComponent, title: "SignUp" },
  { path: 'generation', component: GenerationComponent, title: "Generation Time" },
];