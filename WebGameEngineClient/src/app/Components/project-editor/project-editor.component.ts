import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/Sevices/auth.service';
import { ActivatedRoute } from '@angular/router';

import { MainEngine } from '../../Engine/MainEngine';
import { EngineUIController } from '../../Engine/Core/EngineUIController';
import { ProjectService } from 'src/app/Sevices/ProjectService/project.service';

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.css'],
})
export class ProjectEditorComponent implements OnInit {
  id;

  EngineInstance: MainEngine;
  Controller: EngineUIController;

  @ViewChild('gameCanvas') canvas: ElementRef;

  constructor(
    private auth: AuthService,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.EngineInstance = new MainEngine();
    this.Controller = new EngineUIController(this.EngineInstance);

    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.projectService.GetProject(this.id).subscribe((data) => {
      //this.EngineInstance = data;
      this.EngineInstance.currentScene = data;
      console.log(this.EngineInstance);
      console.log(data);
      // console.log(data);
    });
  }

  ngAfterViewInit(): void {
    this.EngineInstance.InitializeRenderer(this.canvas);
  }

  Play() {
    this.EngineInstance.Run();
  }

  Save() {
    this.projectService.SaveProject(this.EngineInstance).subscribe((data) => {
      console.log(data);
    });
  }
}
