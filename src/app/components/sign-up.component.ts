import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/authng.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  template: `
  <div class="signup-container mb-5">
    <img src="../../assets/Logo.png" alt="LOGO">
    <h2 class="text-center">Sign Up</h2>
    <form (ngSubmit)="signUp()" [formGroup]="signUpForm">
      <!-- Name Input -->
      <div class="mb-3">
        <label for="name" class="form-label">First Name</label>
        <input type="text" class="form-control" id="name" placeholder="Enter your first name" required formControlName="name">
      </div>
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
      <!-- Confirm Password Input -->
      <div class="mb-3">
        <label for="confirm-password" class="form-label">Confirm Password</label>
        <input type="password" class="form-control" id="confirm-password" placeholder="Confirm your password" required formControlName="confirmPassword">
      </div>
      <!-- Sign Up Button -->
      <button type="submit" class="btn btn-primary">Sign Up</button>
    </form>
    <!-- Sign In Link -->
    <div class="signin-link">
      Already have an account? <a routerLink="/sign-in"
      >Sign In</a>
    </div>
  </div>
  `,
  styles: [`
  body {
      background-color: #f8f9fa;
    }
    .signup-container {
      max-width: 400px;
      margin: 0 auto;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      margin-top: 5rem;
    }
    .signup-container h2 {
      margin-bottom: 1.5rem;
      font-weight: 700;
      color: #3b82f6;
    }
    .signup-container img{
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
    .signin-link {
      text-align: center;
      margin-top: 1rem;
    }
    .signin-link a {
      color: #3b82f6;
      text-decoration: none;
    }
    .signin-link a:hover {
      text-decoration: underline;
    }
  `]
})
export class SignUpComponent {
 signUpForm: FormGroup = new FormGroup({
     name: new FormControl(null),
     email: new FormControl(null),
     password: new FormControl(null),
     confirmPassword: new FormControl(null)
   })
   constructor(private readonly authService: AuthService,private router:Router) { }
   signUp() {
     if (this.signUpForm.valid) {
       this.authService.signUp(this.signUpForm.value).subscribe({
         next: (res) => {
           console.log(res);
           this.router.navigate(['/sign-in'])
         }, error: (error) => {
           alert(error);
         }
       })
     }
   }
 }
