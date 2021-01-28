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

  fileEditing: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.projectService.GetProject(this.id).subscribe((data) => {
      this.name = data.name;
      //let projectParsed: GameProject = this.ParseData(data);

      this.EngineInstance = new MainEngine(data);
      this.EngineInstance.Run();
    });
  }

  // ParseData(data): GameProject {
  //   let rawDataGameProject = data;

  //   let sceneData = new Scene(rawDataGameProject.name);
  //   //ParseChildren

  //   // if (rawDataGameProject.scene.children != undefined) {
  //   //   rawDataGameProject.scene.children.forEach((element) => {
  //   //     sceneData.AddChild(element);
  //   //   });
  //   // }

  //   let gameProject: GameProject = new GameProject();
  //   gameProject.scene = sceneData;

  //   // gameProject.CreateComponent(
  //   //   'Draw',
  //   //   `()=>{ return class draw{
  //   //       constructor(){
  //   //          console.log("Draw created");
  //   //       }
  //   //       update(){
  //   //         console.log('Draw being Updated');
  //   //       }
  //   //     }
  //   //   }`
  //   // );

  //   //console.log(rawDataGameProject);

  //   console.log(rawDataGameProject);

  //   for (var key in rawDataGameProject.scripts) {
  //     gameProject.scripts[key] = rawDataGameProject.scripts[key];
  //   }

  //   if (rawDataGameProject.scene.children != undefined) {
  //     rawDataGameProject.scene.children.forEach((element) => {
  //       let object: GameObject = new GameObject(element.name);

  //       //Adding all behavriours
  //       element.behaviours.forEach((behaviour) => {
  //         console.log(behaviour, 'weird');

  //         let behaviourObject = object.AddBehaviour(
  //           behaviour.componentName,
  //           gameProject
  //         );
  //         for (const property in behaviour) {
  //           behaviourObject[property] = behaviour[property];
  //         }
  //       });
  //       gameProject.scene.AddChild(object);
  //     });
  //   }

  //   //Parse Scripts

  //   return gameProject;
  // }

  ngAfterViewInit(): void {}

  Play() {
    this.EngineInstance.Run();
  }

  Save() {
    this.projectService
      .SaveProject({
        id: this.id,
        gameProject: this.EngineInstance.projectModel.project,
      })
      .subscribe((data) => {
        console.log(data);
      });
  }

  ResetEngine() {
    MainEngine.GetInstance().Delete();
  }
}
