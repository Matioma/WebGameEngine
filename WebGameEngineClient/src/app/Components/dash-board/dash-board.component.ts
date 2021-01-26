import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Sevices/User/user.service';
import { AuthService } from '../../Sevices/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
})
export class DashBoardComponent implements OnInit {
  userName = '';

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUserData().subscribe((data) => {
      this.userName = data.message;
    });
  }

  logOut() {
    this.auth.LogOut().subscribe((data) => {
      this.router.navigate(['/home']);
    });
  }
}
