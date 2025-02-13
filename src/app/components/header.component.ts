import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div class="container">
        <img routerLink="/home"
         src="../../assets/Logo.png" alt="LOGO">
        <a class="navbar-brand fw-bold fs-3 text-primary" routerLink="/home">UI Evolution</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a routerLink="/home" routerLinkActive="active"
               class="nav-link" >Home</a>
            </li>
            <li class="nav-item">
              <a routerLink="/features" routerLinkActive="active"
               class="nav-link" >Features</a>
            </li>
            <li class="nav-item">
              <a routerLink="/pricing" routerLinkActive="active"
               class="nav-link" >Pricing</a>
            </li>
            <li class="nav-item">
              <a routerLink="/contact" routerLinkActive="active"
               class="nav-link" >Contact</a>
            </li>
            <li class="nav-item">
              <a routerLink="/about" routerLinkActive="active"
               class="nav-link" >About</a>
            </li>
            <li class="nav-item">
              <a routerLink="/sign-in"
              class="btn btn-primary btn-sm me-2 mt-2" >SignIn</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  `,
  styles: [`
    .active {
      color: #3b82f6 !important;
    }
    .container img{
      width: 70px;
    }
  `]
})
export class HeaderComponent { }