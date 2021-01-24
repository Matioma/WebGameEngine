import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ProjectService } from 'src/app/Sevices/ProjectService/project.service';
import { Project } from '../../Models/Project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  @Input() projectData: Project = { ProjectName: 'test' };

  // @ViewChild('projInput') input;
  constructor(private projService: ProjectService) {
    this.projectData.ProjectName = 'Something';
    //console.log();
  }

  ngOnInit(): void {
    // console.log(this.input);
  }
  Edit() {}
  Delete() {
    let projectName = document.getElementById(this.projectData.ProjectName)
      .value;
    console.log(projectName);
    this.projService
      .DeleteProject({ ProjectName: projectName })
      .subscribe((data) => {
        console.log(data.success);
      });
  }
  Open() {}
}
