import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './Components/register/register.component';
import { HomeNavigationComponent } from './Components/home-navigation/home-navigation.component';
import { DashBoardComponent } from './Components/dash-board/dash-board.component';

import { AuthService } from './Sevices/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    HomeNavigationComponent,
    DashBoardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'dashboard', component: DashBoardComponent },
      {
        path: 'home',
        component: HomeComponent,
        children: [
          {
            path: 'login',
            component: LoginComponent,
          },
          {
            path: 'register',
            component: RegisterComponent,
          },
        ],
      },
    ]),
  ],

  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
