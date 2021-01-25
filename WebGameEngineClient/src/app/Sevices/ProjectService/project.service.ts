import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainEngine } from '../../Engine/MainEngine';

import { Project } from '../../Models/Project';
import { Scene } from 'src/app/Engine/Core/Core';
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  GetProjects() {
    return this.http.get<MainEngine[]>('api/Projects');
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

  GetProject(projectId) {
    // console.log(id, 'sent');//
    // let id = { id: projectId };
    return this.http.get<Scene>(`api/Project/${projectId}`);
  }
}
