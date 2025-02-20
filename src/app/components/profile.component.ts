import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/authng.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  template: `
    <div class="profile-container">
  <div class="profile-card text-center">
    <div class="profile-header">
      <img [src]="user?.profilePicture || 'assets/Logo.png'" alt="Profile Picture" class="profile-picture">
    </div>

    <div class="profile-details">
      <div class="detail-item">
        <span class="detail-label">User Name:</span>
        <span class="detail-value">{{ user?.name || "User Name"}}</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Email:</span>
        <span class="detail-value">{{ user?.email || "User Email"}}</span>
      </div>
    </div>

    <button class="btn btn-outline-primary btn-lg logout-button" (click)="logout()">Logout</button>
  </div>
</div>
  `,
  styles: [`
  .profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 2rem;
}

.profile-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
}

.profile-header {
  margin-bottom: 1.5rem;
}

.profile-picture {
  width: 8rem;
  height:11.2rem;
  border-radius: 30%;
  object-fit: cover;
  border: 4px solid #3b82f6;
  margin-bottom: 1rem;
}

.profile-name {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #333;
}

.profile-email {
  font-size: 1rem;
  color: #666;
}

.profile-details {
  margin-bottom: 2rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-label {
  font-weight: 600;
  color: #555;
}

.detail-value {
  color: #333;
}

.logout-button {
  width: 100%;
  font-size: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

    `]
})
export class ProfileComponent {
  user: { name: string; email: string; profilePicture: string } | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.user = this.authService.getUser();
  }

  logout() {
    localStorage.removeItem("token");
    this.authService.logout();

    this.router.navigate(['/sign-in']);
  }
}