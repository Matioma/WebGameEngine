import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MainEngine } from '../../Engine/MainEngine';
import { EngineUIController } from '../../Engine/Core/EngineUIController';
import { ProjectService } from 'src/app/Sevices/ProjectService/project.service';
import { GameObject, GameProject, Scene } from 'src/app/Engine/Core/Core';
import { EditorController } from '../../Engine/Core/EngineUIController';

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.css'],
})
export class ProjectEditorComponent implements OnInit {
  id: String;
  // projectName: String;

  name: String = 'UNamed';

  EngineInstance: MainEngine;
  Controller: EngineUIController;

  gameProject: GameProject = new GameProject();

  @ViewChild('gameCanvas') canvas: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService
  ) {
    EditorController.getInstance().id = 10;
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.projectService.GetProject(this.id).subscribe((data) => {
      this.gameProject = data;
      this.name = data.name;
      this.ParseData(data);
      this.Controller = new EngineUIController(this.gameProject);

      this.EngineInstance = new MainEngine(this.gameProject);
      console.log(this.EngineInstance);
      this.Play();
    });
  }

  ParseData(data) {
    let rawDataGameProject = data;

    let sceneData = new Scene(rawDataGameProject.name);

    if (rawDataGameProject.scene.children != undefined) {
      rawDataGameProject.scene.children.forEach((element) => {
        sceneData.AddChild(element);
      });
    }

    this.gameProject = new GameProject();
    this.gameProject.scene = sceneData;

    this.gameProject.CreateComponent(
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
    this.gameProject.scene.AddBehaviour('Draw', this.gameProject);
  }

  ngAfterViewInit(): void {
    //this.EngineInstance.InitializeRenderer(this.canvas);
  }

  Play() {
    this.EngineInstance.Run();
  }

  Save() {
    this.projectService
      .SaveProject({
        id: this.id,
        gameProject: this.gameProject,
      })
      .subscribe((data) => {
        console.log(data);
      });
  }
}
