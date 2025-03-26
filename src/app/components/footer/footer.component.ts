import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
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
