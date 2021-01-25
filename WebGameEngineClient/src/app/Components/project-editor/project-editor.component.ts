import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/Sevices/auth.service';

import { MainEngine } from '../../Engine/MainEngine';
import { EngineUIController } from '../../Engine/Core/EngineUIController';

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.css'],
})
export class ProjectEditorComponent implements OnInit {
  EngineInstance: MainEngine;
  Controller: EngineUIController;

  @ViewChild('gameCanvas') canvas: ElementRef;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.EngineInstance = new MainEngine();
    this.Controller = new EngineUIController(this.EngineInstance);
  }

  ngAfterViewInit(): void {
    this.EngineInstance.InitializeRenderer(this.canvas);
  }

  Play() {
    this.EngineInstance.Run();
  }
}
