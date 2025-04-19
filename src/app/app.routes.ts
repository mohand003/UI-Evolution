import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { FeaturesComponent } from './components/features/features.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { ContactComponent } from './components/contact/contact.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { GenerationComponent } from './components/generation/generation.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, title: "UI-Evolution" },
    { path: 'about', component: AboutComponent, title: "UI-Evolution.About" },
    { path: 'features', component: FeaturesComponent, title: "UI-Evolution.Features" },
    { path: 'pricing', component: PricingComponent, title: "UI-Evolution.Pricing" },
    { path: 'contact', component: ContactComponent, title: "UI-Evolution.Contact" },
    { path: 'sign-in', component: SignInComponent, title: "UI-Evolution.SignIn" },
    { path: 'sign-up', component: SignUpComponent, title: "UI-Evolution.SignUp" },
    { path: 'generation', component: GenerationComponent, title: "UI-Evolution.Generation Time" },
    { path: 'profile', component: ProfileComponent, title: "UI-Evolution.Profile" },
];