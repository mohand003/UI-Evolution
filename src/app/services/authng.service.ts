import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getUserData(token:string)
{

  return jwtDecode(token);
}



  private signupUrl = 'http://ui-evolution.onrender.com/auth/signUp';
  private signinUrl = 'http://ui-evolution.onrender.com/auth/logIn';

  constructor(private http: HttpClient) {}

  signUp(userData: { username: string; email: string; password: string; confirmPassword: string }): Observable<any> {
    return this.http.post(this.signupUrl, userData);
  }

  signIn(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(this.signinUrl, credentials);
  }
}
