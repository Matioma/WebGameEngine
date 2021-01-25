import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainEngine } from '../../Engine/MainEngine';

import { Project } from '../../Models/Project';
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  GetProjects() {
    return this.http.get<Project[]>('api/Projects');
  }

  AddProject(data: Project) {
    return this.http.post('api/Projects/add', data);
  }

  DeleteProject(data: Project) {
    return this.http.post('/api/Projects/delete', data);
  }

  SaveProject(engine: MainEngine) {
    return this.http.post('api/Projects/save', engine);
  }
}
