import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/Sevices/auth.service';

import { MainEngine } from '../../Engine/MainEngine';
declare const MyTest: any;

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.css'],
})
export class ProjectEditorComponent implements OnInit {
  EngineInstance: MainEngine;

  @ViewChild('gameCanvas') canvas: ElementRef;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.EngineInstance = new MainEngine();
  }

  ngAfterViewInit(): void {
    this.EngineInstance.InitializeRenderer(this.canvas);
  }

  Play() {
    this.EngineInstance.Run();
  }
}
