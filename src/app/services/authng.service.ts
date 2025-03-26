import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private user: { name: string; email: string } | null = null;

  getUserData(token: string, name: string, email: string) {

    return jwtDecode(token);
  }



  private signupUrl = 'https://ui-evolution.onrender.com/auth/signUp';
  private signinUrl = 'https://ui-evolution.onrender.com/auth/logIn';

  constructor(private http: HttpClient) { }

  signUp(userData: { username: string; email: string; password: string; confirmPassword: string }): Observable<any> {
    return this.http.post(this.signupUrl, userData);
  }

  signIn(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(this.signinUrl, credentials);
  }


  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }


  logout() {
    this.user = null;
    localStorage.removeItem('user');
  }
}
