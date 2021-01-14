import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Project} from "../../Models/Project"
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }

  GetProjects(){
    return this.http.get<Project[]>("api/Projects");
  }
}
