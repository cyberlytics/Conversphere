import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthUser } from '../interfaces/auth-user';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  private baseUrl = 'http://localhost:8080/auth';
  public httpHeaders: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) { }

  info(request: string): Observable<any> {
    const url = `http://localhost:8080/info`;
    return this.http.get(url, {headers: this.httpHeaders});
  }

  register(username: string, email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/register`;
    console.log(username, email, password);
    return this.http.post<AuthUser>(url, {
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

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  postBlog(blog: any) {
    let url = "http://localhost:8080/blogs";
    return this.http.get(url, this.httpOptions);
  }
}
