import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

interface Credentials {
  login: string;
  password: string;
}

interface AuthentificationResponse {
  success: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  RegisterUser(data: Credentials) {
    return this.http.post<AuthentificationResponse>('/api/register', data);
  }
  LoginUser(data: Credentials) {
    return this.http.post<AuthentificationResponse>('/api/login', data);
  }
}
