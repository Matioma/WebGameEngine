import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectService } from 'src/app/Sevices/ProjectService/project.service';
import { Project } from '../../Models/Project';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  @Input() projectData;

  @Output()
  projectUpdated = new EventEmitter();

  constructor(
    private projService: ProjectService,

    private router: Router
  ) {}

  onProjectUpdated(message: Object) {
    this.projectUpdated.emit(message);
  }

  ngOnInit(): void {}
  Edit() {}
  Delete() {
    this.projService
      .DeleteProject({ id: this.projectData._id })
      .subscribe((data) => {
        let d: any = data;
        if (d.success) {
          this.onProjectUpdated({ success: true });
        }
      });
  }
  Open() {
    this.router.navigate(['/project', this.projectData._id]);
  }
}
