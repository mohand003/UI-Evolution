import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private feedbackUrl = 'https://ui-evolution.onrender.com/home/feedback';
  private subscribeUrl = 'https://ui-evolution.onrender.com/home/subscribe';


  constructor(private http: HttpClient) { }

  sendFeedback(data: any): Observable<any> {
    return this.http.post(this.feedbackUrl, data);
  }

  subscribe(data: any): Observable<any> {
    return this.http.post(this.subscribeUrl, data);
  }

  generation(apiUrl: string, userInput: string): Observable<any> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    console.log(headers)

    const body = { "message": userInput , "Token":token};

    return this.http.post(apiUrl, body, { headers, responseType: 'json' });
    // return this.http.post(apiUrl, { input: userInput });
  }
}
