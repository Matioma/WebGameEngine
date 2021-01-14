import { Component, OnInit } from '@angular/core';
import {Project} from '../../Models/Project';
import {ProjectService} from '../../Sevices/ProjectService/project.service'
@Component({
  selector: 'app-projects-view',
  templateUrl: './projects-view.component.html',
  styleUrls: ['./projects-view.component.css'],
})
export class ProjectsViewComponent implements OnInit {
  projects;
  constructor(private projSer:ProjectService) {}

  ngOnInit(): void {
    this.projSer.GetProjects().subscribe(data=>{
      console.log(data);
      this.projects = data;
    });
  }

  AddProject(){
    this.projSer.AddProject().subscribe(data=>{
      console.log(data);
    });
  }
}
