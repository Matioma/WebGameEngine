import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Credentials {
  login: string;
  password: string;
}

interface AuthentificationResponse {
  success: boolean;
  error: string;
}

interface IsLoggedIn {
  loggedIn: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;

  set IsLoggedIn(value: boolean) {
    this.isLoggedIn = value;
  }
  get IsLoggedIn() {
    return this.isLoggedIn;
  }

  constructor(private http: HttpClient) {}

  RegisterUser(data: Credentials) {
    return this.http.post<AuthentificationResponse>('/api/register', data);
  }
  LoginUser(data: Credentials) {
    return this.http.post<AuthentificationResponse>('/api/login', data);
  }
  LogOut() {
    return this.http.post('/api/logout', {});
  }

  IsLoggedInAPI() {
    return this.http.get<IsLoggedIn>('/api/loggedIn');
  }
}
