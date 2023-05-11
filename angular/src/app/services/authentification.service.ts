import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthUser } from '../interfaces/auth-user';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  register(username: string, email: string, password: string) {
    const url = `${this.baseUrl}/register`;
    console.log(username, email, password);
    this.http.post<AuthUser>(url, {
        "username" : username,
        "email" : email,
        "password" : password
      }
    );
  }

  login(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post(url, { email, password });
  }
}
