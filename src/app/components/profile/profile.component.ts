import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/authng.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user: { name: string; email: string; profilePicture: string } | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.user = this.authService.getUser();
  }


  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }


  logout() {
    localStorage.removeItem("token");
    this.authService.logout();

    this.router.navigate(['/sign-in']);
  }
}
