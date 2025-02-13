import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private feedbackUrl = 'http://ui-evolution.onrender.com/home/feedback';
  private subscribeUrl = 'http://ui-evolution.onrender.com/home/subscribe';
  private chatUrl = 'http://127.0.0.1:3000/home/chat';


  constructor(private http: HttpClient) { }

  sendFeedback(data:any): Observable<any> {
    return this.http.post(this.feedbackUrl, data);
  }

  subscribe(data: any): Observable<any> {
    return this.http.post(this.subscribeUrl, data);
  }

  generation(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, { responseType: 'blob' });
  }

}
