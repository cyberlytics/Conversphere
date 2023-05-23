import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthUser } from '../interfaces/auth-user';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  info(request: any): Observable<any> {
    const url = `http://localhost:8080/info`;
    return this.http.get(url, this.httpOptions).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/register`;
    console.log(username, email, password);
    return this.http.post<AuthUser>(url, {
      username: username,
      email: email,
      password: password,
    });
  }

  login(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post(url, {
      email: email,
      password: password,
    });
  }
}
