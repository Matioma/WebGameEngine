import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './Components/register/register.component';
import { HomeNavigationComponent } from './Components/home-navigation/home-navigation.component';
import { DashBoardComponent } from './Components/dash-board/dash-board.component';
import { ProjectsViewComponent } from './Components/projects-view/projects-view.component';

import { AuthService } from './Sevices/auth.service';
import { DashboardGuard } from './Guards/dashboard.guard';
import { ProjectComponent } from './Components/project/project.component';
import { ProjectEditorComponent } from './Components/project-editor/project-editor.component';
import { HierarchyViewComponent } from './Components/hierarchy-view/hierarchy-view.component';
import { HierarchyElementComponent } from './Components/hierarchy-element/hierarchy-element.component';
import { InspectorViewComponent } from './Components/inspector-view/inspector-view.component';
import { BehaviourViewComponent } from './Components/behaviour-view/behaviour-view.component';
import { FilesViewComponent } from './Components/files-view/files-view.component';
import { FileIconComponent } from './Components/file-icon/file-icon.component';
import { TextEditorComponent } from './Components/text-editor/text-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    HomeNavigationComponent,
    DashBoardComponent,
    ProjectComponent,
    ProjectsViewComponent,
    ProjectEditorComponent,
    HierarchyViewComponent,
    HierarchyElementComponent,
    InspectorViewComponent,
    BehaviourViewComponent,
    FilesViewComponent,
    FileIconComponent,
    TextEditorComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      {
        path: 'dashboard',
        component: DashBoardComponent,
        canActivate: [DashboardGuard],
      },
      {
        path: 'project/:id',
        component: ProjectEditorComponent,
      },
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

  providers: [AuthService, DashboardGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
