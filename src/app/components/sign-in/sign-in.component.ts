import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/authng.service';

@Component({
  selector: 'app-sign-in',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  signInForm: FormGroup = new FormGroup({
    name: new FormControl(null),
    email: new FormControl(null),
    password: new FormControl(null)
  })
  constructor(private authService: AuthService, private router: Router) { }
  signIn() {
    if (this.signInForm.valid) {
      const user = this.signInForm.value;
      this.authService.signIn(this.signInForm.value).subscribe({
        next: (res) => {
          console.log(res);
          localStorage.setItem('user', JSON.stringify({ name: user.name, email: user.email }));
          localStorage.setItem('token', res.token)

          this.router.navigate(['/home'])
        }, error: (error) => {
          alert(error);
        }
      })
    }
  }
}
