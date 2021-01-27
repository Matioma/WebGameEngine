import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MainEngine } from '../../Engine/MainEngine';
import { ProjectService } from 'src/app/Sevices/ProjectService/project.service';
import { GameObject, GameProject, Scene } from 'src/app/Engine/Core/Core';
import { EditorController } from '../../Engine/Core/UIController';

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.css'],
})
export class ProjectEditorComponent implements OnInit {
  id: String;
  name: String = 'Unamed';
  EngineInstance: MainEngine;

  @ViewChild('gameCanvas') canvas: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.projectService.GetProject(this.id).subscribe((data) => {
      this.name = data.name;

      let projectParsed: GameProject = this.ParseData(data);

      this.EngineInstance = new MainEngine(projectParsed);

      console.log(this.EngineInstance);
      this.EngineInstance.Run();
    });
  }

  ParseData(data): GameProject {
    let rawDataGameProject = data;

    let sceneData = new Scene(rawDataGameProject.name);
    //ParseChildren
    if (rawDataGameProject.scene.children != undefined) {
      rawDataGameProject.scene.children.forEach((element) => {
        sceneData.AddChild(element);
      });
    }

    if (rawDataGameProject.scene.children != undefined) {
      rawDataGameProject.scene.children.forEach((element) => {
        sceneData.AddChild(element);
      });
    }

    let gameProject: GameProject = new GameProject();
    gameProject.scene = sceneData;

    gameProject.CreateComponent(
      'Draw',
      `()=>{ return class draw{
          constructor(){
             console.log("Draw created");
          } 
          update(){
            console.log('Draw being Updated');
          }
        }
      }`
    );
    gameProject.scene.AddBehaviour('Draw', gameProject);
    return gameProject;
  }

  ngAfterViewInit(): void {
    //this.EngineInstance.InitializeRenderer(this.canvas);
  }

  Play() {
    this.EngineInstance.Run();
  }

  Save() {
    // EditorController.getInstance().Save();
    this.projectService
      .SaveProject({
        id: this.id,
        gameProject: this.EngineInstance.projectModel.project,
      })
      .subscribe((data) => {
        console.log(data);
      });
  }
}
