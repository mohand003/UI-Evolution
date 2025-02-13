import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <main style="padding: 4rem 0;">
      <div class="container" style="max-width: 800px;">
        <h1 style="font-size: 2.5rem; margin-bottom: 1rem; text-align: center;">Get in Touch</h1>
        <p style="text-align: center; color: #666; margin-bottom: 3rem;">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>

        <div class="card">
          <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" style="display: flex; flex-direction: column; gap: 1.5rem;">
            <div>
              <label for="name" style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Name</label>
              <input
                id="name"
                type="text"
                formControlName="name"
                style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 6px; font-size: 1rem;"
                [ngStyle]="{'border-color': contactForm.get('name')?.touched && contactForm.get('name')?.invalid ? '#ef4444' : '#ddd'}"
              >
              <div *ngIf="contactForm.get('name')?.touched && contactForm.get('name')?.invalid"
                   style="color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem;">
                Please enter your name
              </div>
            </div>

            <div>
              <label for="email" style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Email</label>
              <input
                id="email"
                type="email"
                formControlName="email"
                style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 6px; font-size: 1rem;"
                [ngStyle]="{'border-color': contactForm.get('email')?.touched && contactForm.get('email')?.invalid ? '#ef4444' : '#ddd'}"
              >
              <div *ngIf="contactForm.get('email')?.touched && contactForm.get('email')?.invalid"
                   style="color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem;">
                Please enter a valid email address
              </div>
            </div>

            <div>
              <label for="message" style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Message</label>
              <textarea
                id="message"
                formControlName="message"
                rows="5"
                style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 6px; font-size: 1rem; resize: vertical;"
                [ngStyle]="{'border-color': contactForm.get('message')?.touched && contactForm.get('message')?.invalid ? '#ef4444' : '#ddd'}"
              ></textarea>
              <div *ngIf="contactForm.get('message')?.touched && contactForm.get('message')?.invalid"
                   style="color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem;">
                Please enter your message
              </div>
            </div>

            <button
              type="submit"
              class="btn btn-primary"
              style="width: 100%;"
              [disabled]="contactForm.invalid || submitting"
            >
              {{ submitting ? 'Sending...' : 'Send Message' }}
            </button>
          </form>
        </div>
      </div>
    </main>
  `
})
export class ContactComponent {
  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', Validators.required)
  });

  submitting = false;
  constructor(private homeService: HomeService) { }
  onSubmit() {
    if (this.contactForm.valid) {
      this.submitting = true;
      this.homeService.sendFeedback(this.contactForm.value).subscribe({
        next: () => {
          this.submitting = false;
          alert('Message sent successfully!');
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }
}