import { Component, OnInit,Input } from '@angular/core';
import {Project}from '../../Models/Project';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  @Input() projectData:Project={ProjectName:"test"};
  
  constructor() {
    this.projectData.ProjectName="Something";
  }

  ngOnInit(): void {}
  Edit() {}
  Delete() {}
  Open() {}
}
