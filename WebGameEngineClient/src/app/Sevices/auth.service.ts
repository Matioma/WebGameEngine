import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

interface Credentials {
  login: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  RegisterUser(data: Credentials) {
    this.http.post('http://localhost:3000/api/register', data).subscribe(() => {
      console.log('sent register request');
    });
  }
  LoginUser(data: Credentials) {
    this.http.post('http://localhost:3000/api/login', data).subscribe(() => {
      console.log('sent register request');
    });
  }
}
