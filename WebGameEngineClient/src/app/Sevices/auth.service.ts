import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

interface Credentials {
  login: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  RegisterUser(data: Credentials) {
    console.log(data);
  }
  LoginUser(data: Credentials) {
    console.log(data);
  }
}
