import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/authng.service';

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  signUpForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required), // Name field with validation
    email: new FormControl(null, [Validators.required, Validators.email]), // Email field with validation
    password: new FormControl(null, Validators.required), // Password field with validation
    confirmPassword: new FormControl(null, Validators.required), // Confirm Password field with validation
  });

  constructor(private readonly authService: AuthService, private router: Router) { }

  signUp() {
    if (this.signUpForm.valid) {
      const user = this.signUpForm.value; // Get the form values

      this.authService.signUp(user).subscribe({
        next: (res) => {
          // Save user data in localStorage
          localStorage.setItem('user', JSON.stringify({ name: user.name, email: user.email }));

          console.log(res);
          this.router.navigate(['/sign-in']);
        },
        error: (error) => {
          alert(error);
        },
      });
    } else {
      console.error('Please fill out all fields correctly.');
    }
  }
}
