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

  // @ViewChild('projInput') input;
  constructor(private projService: ProjectService, private router: Router) {
    //this.projectData.projectName = 'Something';
    // console.log();
  }

  onProjectUpdated(message: Object) {
    this.projectUpdated.emit(message);
  }

  ngOnInit(): void {
    // console.log(this.projectData.projectName, 'Vakye');
    //this.projectData.projectName = 'Something';
  }
  Edit() {}
  Delete() {
    // let projectName = document.getElementById(this.projectData.ProjectName)
    //   .value;
    // this.projService
    //   .DeleteProject({ ProjectName: projectName })
    //   .subscribe((data) => {
    //     this.onProjectUpdated({ success: true });
    //   });
  }
  Open() {
    this.router.navigate(['/project', this.projectData._id]);
  }
}
