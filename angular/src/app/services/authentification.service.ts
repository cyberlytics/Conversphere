import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  private baseUrl = 'http://localhost/auth';

  constructor(private http: HttpClient) { }

  register(username: string, email: string, password: string): Observable<any> {
    const url = `localhost:8080/auth/register`;
    console.log(username, email, password);
    return this.http.post(url, {username, email, password });
  }

  login(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post(url, { email, password });
  }
}
