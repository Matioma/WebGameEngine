import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface userData {
  status: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserData() {
    return this.http.get<userData>('/api/userData');
  }
}
