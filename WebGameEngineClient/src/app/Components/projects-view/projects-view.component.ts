import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from '../../Models/Project';
import { ProjectService } from '../../Sevices/ProjectService/project.service';
@Component({
  selector: 'app-projects-view',
  templateUrl: './projects-view.component.html',
  styleUrls: ['./projects-view.component.css'],
})
export class ProjectsViewComponent implements OnInit {
  errors: string[] = [];

  shouldShow = false;
  projects;

  @ViewChild('projectInput') input;
  constructor(private projSer: ProjectService) {}

  ngOnInit(): void {
    this.projSer.GetProjects().subscribe((data) => {
      console.log(data);
      this.projects = data;
    });
  }

  AddProject(data: Project) {
    this.projSer.AddProject(data).subscribe((data) => {
      console.log(data);
      this.ngOnInit();
    });
  }

  CreateProject() {
    this.AddProject({ ProjectName: this.input.nativeElement.value });
  }
  ToggleProject() {
    this.shouldShow = !this.shouldShow;
  }
}
