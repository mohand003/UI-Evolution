import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HomeService } from '../services/home.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
  <footer class="bg-dark text-white py-5">
    <div class="container">
      <div class="parent row g-4">
        <div class="col-md-4">
          <h5 class="fw-bold mb-3">Quick Links</h5>
          <ul class="list-unstyled">
            <li><a routerLink="/home" class="text-white text-decoration-none hover-color-blue-500">Home</a></li>
            <li><a routerLink="/features" class="text-white text-decoration-none">Features</a></li>
            <li><a routerLink="/pricing" class="text-white text-decoration-none">Pricing</a></li>
            <li><a routerLink="/contact" class="text-white text-decoration-none">Contact</a></li>
          </ul>
        </div>

        <div class="col-md-4">
          <h5 class="fw-bold mb-3">Follow Us</h5>
          <ul class="list-unstyled">
            <li><a routerLink="#" class="text-white text-decoration-none">Facebook</a></li>
            <li><a routerLink="#" class="text-white text-decoration-none">Twitter</a></li>
            <li><a routerLink="#" class="text-white text-decoration-none">Instagram</a></li>
            <li><a routerLink="#" class="text-white text-decoration-none">LinkedIn</a></li>
          </ul>
        </div>

        <div class="col-md-4">
          <h5 class="fw-bold mb-3">Subscribe to Our Newsletter</h5>
            <form class="input-group" [formGroup]="subscribeForm" (ngSubmit)="subscribe()">
              <input type="email" class="form-control" placeholder="Your email" aria-label="Your email" formControlName="email">
              <button class="btn btn-primary" type="submit">Subscribe</button>
            </form>
        </div>
      </div>

      <div class="text-center mt-5 pt-4 border-top">
        <p class="mb-0">&copy; 2025 UI Evolution. All rights reserved.</p>
      </div>
    </div>
  </footer>
  `,
  styles: [`
  a.text-white:hover {
    color: #3b82f6 !important; /* Change to your desired hover color */
    text-decoration: underline !important; /* Optional: Add underline on hover */
  }
  `]
})
export class FooterComponent {

  clearInput() {
    this.subscribeForm.get('email')?.reset();
  }
  feedback = { name: '', email: '', message: '' };
  message = '';
  subscribeForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
  });

  constructor(private homeService: HomeService, private router: Router) { }

  sendFeedback() {
    this.homeService.sendFeedback(this.feedback).subscribe({
      next: (res) => (this.message = res.message),
      error: (err) => (this.message = err.error.message || 'Failed to send feedback!'),
    });
  }
  subscribe() {
    if (this.subscribeForm.valid) {
      this.homeService.subscribe(this.subscribeForm.value).subscribe({
        next: (res) => {
          alert(res);
          this.clearInput()
        }, error: (error) => {
          alert(error);
        }
      })
    }
  }
}
