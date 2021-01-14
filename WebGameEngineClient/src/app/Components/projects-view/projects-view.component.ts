import { Component, OnInit } from '@angular/core';
import {Project} from '../../Models/Project';

@Component({
  selector: 'app-projects-view',
  templateUrl: './projects-view.component.html',
  styleUrls: ['./projects-view.component.css'],
})
export class ProjectsViewComponent implements OnInit {

  projects:Project[] =[{ProjectName:"MyDemoProject"},
            {ProjectName:"First real project"}]
  constructor() {}

  ngOnInit(): void {
  }

  AddProject(){
    console.log("Add Project called");
  }
}
