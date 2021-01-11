import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Sevices/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) {}
  errors = [];
  ngOnInit(): void {}

  registerUser(event) {
    this.errors = [];

    event.preventDefault();
    const target = event.target;

    const login = target.querySelector('#login').value;
    const password = target.querySelector('#password').value;
    const rPassword = target.querySelector('#rPassword').value;

    if (password !== rPassword) {
      target.querySelector('#password').value = '';
      target.querySelector('#rPassword').value = '';
      this.errors.push('passwords Do not match');
    }

    if (this.errors.length == 0) {
      this.auth.RegisterUser({ login, password }).subscribe((data) => {
        if (data.success) {
          this.router.navigate(['dashboard']);
        } else {
          this.errors.push(data.error);
        }
      });
    }
  }
}
