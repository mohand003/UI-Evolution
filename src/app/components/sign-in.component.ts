import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/authng.service';


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  template: `
  <div class="signin-container mb-5">
    <img src="../../assets/Logo.png" alt="Logo">
    <h2 class="text-center">Sign In</h2>
    <form [formGroup]="signInForm" (ngSubmit)="signIn()">
      <!-- Email Input -->
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input type="email" class="form-control" id="email" placeholder="Enter your email" required formControlName="email">
      </div>
      <!-- Password Input -->
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" placeholder="Enter your password" required formControlName="password">
      </div>
      <!-- Sign In Button -->
      <button  type="submit" class="btn btn-primary">Sign In</button>
    </form>
    <!-- Sign Up Link -->
    <div class="signup-link">
      Don't have an account? <a routerLink="/sign-up"
      >Sign Up</a>
    </div>
  </div>

`,
  styles: [`
  body {
      background-color: #f8f9fa;
    }
    .signin-container {
      max-width: 400px;
      margin: 0 auto;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      margin-top: 5rem;
    }
    .signin-container h2 {
      margin-bottom: 1.5rem;
      font-weight: 700;
      color: #3b82f6;
    }

    .signin-container img {
      max-width: 100%;
    }

    .form-control:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 0.2rem rgba(59, 130, 246, 0.25);
    }
    .btn-primary {
      background-color: #3b82f6;
      border: none;
      width: 100%;
      padding: 0.75rem;
      font-size: 1rem;
    }
    .btn-primary:hover {
      background-color: #2563eb;
    }
    .signup-link {
      text-align: center;
      margin-top: 1rem;
    }
    .signup-link a {
      color: #3b82f6;
      text-decoration: none;
    }
    .signup-link a:hover {
      text-decoration: underline;
    }
  `]
})
export class SignInComponent {
  signInForm: FormGroup = new FormGroup({
    email: new FormControl(null),
    password: new FormControl(null)
  })
  constructor(private readonly authService: AuthService,private router:Router) { }
  signIn() {
    if (this.signInForm.valid) {
      this.authService.signIn(this.signInForm.value).subscribe({
        next: (res) => {
          console.log(res);
          localStorage.setItem('token',res.token)
          
          this.router.navigate(['/home'])
        }, error: (error) => {
          alert(error);
        }
      })
    }
  }
}
