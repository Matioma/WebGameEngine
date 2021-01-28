import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from '../../Models/Project';
import { ProjectService } from '../../Sevices/ProjectService/project.service';
import { GameProject } from '../../Engine/Core/Core';
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
      this.projects = data;
    });
  }

  AddProject(projectName: string) {
    let newProject: GameProject = new GameProject();
    newProject.name = projectName;

    this.projSer.AddProject(newProject).subscribe((response) => {
      this.ngOnInit();
    });
  }

  CreateProject() {
    let projectName: string = this.input.nativeElement.value;
    this.AddProject(projectName);
  }
  ToggleProject() {
    this.shouldShow = !this.shouldShow;
  }
  reload() {
    this.ngOnInit();
  }

  UpdateProjectsList($event) {
    if ($event.success) {
      this.ngOnInit();
    }
  }

  projectUpdate($event) {
    this.UpdateProjectsList($event);
  }
}
