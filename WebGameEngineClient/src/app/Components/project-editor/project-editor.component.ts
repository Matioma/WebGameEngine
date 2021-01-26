import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MainEngine } from '../../Engine/MainEngine';
import { EngineUIController } from '../../Engine/Core/EngineUIController';
import { ProjectService } from 'src/app/Sevices/ProjectService/project.service';
import { GameObject, GameProject, Scene } from 'src/app/Engine/Core/Core';

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.css'],
})
export class ProjectEditorComponent implements OnInit {
  id: String;
  // projectName: String;

  EngineInstance: MainEngine;
  Controller: EngineUIController;

  gameProject: GameProject;

  @ViewChild('gameCanvas') canvas: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.EngineInstance = new MainEngine();

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.projectService.GetProject(this.id).subscribe((data) => {
      this.gameProject = data;
      console.log(this.gameProject);
      this.ParseSceneData(data);
      this.Controller = new EngineUIController(this.gameProject);
    });
  }

  ParseSceneData(data) {
    let rawDataScene = data;

    let sceneData = new Scene(rawDataScene.name);
    this.gameProject.scene = sceneData;
    console.log(this.gameProject);
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
