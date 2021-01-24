import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectService } from 'src/app/Sevices/ProjectService/project.service';
import { Project } from '../../Models/Project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  @Input() projectData: Project = { ProjectName: 'test' };

  @Output()
  projectUpdated = new EventEmitter();

  // @ViewChild('projInput') input;
  constructor(private projService: ProjectService) {
    this.projectData.ProjectName = 'Something';
    //console.log();
  }

  onProjectUpdated(message: Object) {
    this.projectUpdated.emit(message);
  }

  ngOnInit(): void {}
  Edit() {}
  Delete() {
    let projectName = document.getElementById(this.projectData.ProjectName)
      .value;

    this.projService
      .DeleteProject({ ProjectName: projectName })
      .subscribe((data) => {
        this.onProjectUpdated({ success: true });
      });
  }
  Open() {}
}
