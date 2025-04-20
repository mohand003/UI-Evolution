import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { HomeService } from '../../services/home.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  alertMessage = '';
  alertType: 'success' | 'danger' = 'success';
  showAlert = false;

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
          this.alertType = 'success';
          this.alertMessage = 'Subscribed successfully!';
          this.showAlert = true;
          setTimeout(() => this.showAlert = false, 3000);
          this.clearInput();
        },
        error: (error) => {
          this.alertType = 'danger';
          this.alertMessage = 'Subscription failed. Please try again.';
          this.showAlert = true;
          setTimeout(() => this.showAlert = false, 3000);
        }
      });
    }
  }
}
