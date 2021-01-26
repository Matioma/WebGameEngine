import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/Sevices/auth.service';
import { ActivatedRoute } from '@angular/router';

import { MainEngine } from '../../Engine/MainEngine';
import { EngineUIController } from '../../Engine/Core/EngineUIController';
import { ProjectService } from 'src/app/Sevices/ProjectService/project.service';
import { GameProject } from 'src/app/Engine/Core/Core';

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.css'],
})
export class ProjectEditorComponent implements OnInit {
  id: String;
  projectName: String;

  EngineInstance: MainEngine;
  Controller: EngineUIController;

  gameProject: GameProject;

  @ViewChild('gameCanvas') canvas: ElementRef;

  constructor(
    private auth: AuthService,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService
  ) {
    this.gameProject = new GameProject();
  }

  ngOnInit(): void {
    this.EngineInstance = new MainEngine();
    this.Controller = new EngineUIController(this.EngineInstance);

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.projectService.GetProject(this.id).subscribe((data) => {
      // console.log(data);
      this.gameProject = data;
      // this.EngineInstance.currentScene = data.project.currentScene;
      // this.ParseData(data.project);
      // this.id = data.project._id;
      // this.projectName = data.project.projectName;
    });
  }

  ngAfterViewInit(): void {
    this.EngineInstance.InitializeRenderer(this.canvas);
  }

  Play() {
    this.EngineInstance.Run();
  }

  Save() {
    this.projectService
      .SaveProject({
        id: this.id,
        currentScene: this.EngineInstance.currentScene,
      })
      .subscribe((data) => {
        console.log(data);
      });
  }

  ParseData(Project) {
    //console.log(Project.currentScene);

    Project.currentScene.children.forEach((element) => {
      console.log(element.name);
    });
  }
}
