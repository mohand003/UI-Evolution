import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeService } from '../../services/home.service';
@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
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
