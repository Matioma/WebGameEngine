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
      console.log(data);
      this.name = data.name;
      //let projectParsed: GameProject = this.ParseData(data);

      this.EngineInstance = new MainEngine(data);
      this.EngineInstance.InitializeRenderer(this.canvas);
      this.EngineInstance.Run();
    });
  }

  ngAfterViewInit(): void {}

  Play() {
    this.EngineInstance.Run();
  }

  Save() {
    console.log(this.EngineInstance.projectModel.project);

    this.EngineInstance.projectModel.project.scene.children.forEach((child) => {
      child.behaviours.forEach((behaviour) => {
        delete behaviour['owner'];
      });
    });

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

  TogglePause() {
    console.log('Cool');
    MainEngine.GetInstance().togglePause();
  }
}
