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
    { path: 'home', component: HomeComponent, title: "Home" },
    { path: 'about', component: AboutComponent, title: "About" },
    { path: 'features', component: FeaturesComponent, title: "Features" },
    { path: 'pricing', component: PricingComponent, title: "Pricing" },
    { path: 'contact', component: ContactComponent, title: "Contact" },
    { path: 'sign-in', component: SignInComponent, title: "SignIn" },
    { path: 'sign-up', component: SignUpComponent, title: "SignUp" },
    { path: 'generation', component: GenerationComponent, title: "Generation Time" },
    { path: 'profile', component: ProfileComponent, title: "Profile" },
];