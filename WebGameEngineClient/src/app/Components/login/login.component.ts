import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Sevices/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) {}
  errors = [];

  ngOnInit(): void {}

  loginUser(event) {
    event.preventDefault();

    const target = event.target;

    const login = target.querySelector('#login').value;
    const password = target.querySelector('#password').value;

    // this.router.navigate(['dashboard']);
    this.auth.LoginUser({ login, password });
  }
}
