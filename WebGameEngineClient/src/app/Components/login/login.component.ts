import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Sevices/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  errors = [];

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {}

  loginUser(event) {
    this.errors = [];
    event.preventDefault();

    const target = event.target;
    const login = target.querySelector('#login').value;
    const password = target.querySelector('#password').value;

    this.auth.LoginUser({ login, password }).subscribe((res) => {
      if (res.success) {
        this.router.navigate(['dashboard']);
      } else {
        this.errors.push(res.error);
      }
    });
  }
}
