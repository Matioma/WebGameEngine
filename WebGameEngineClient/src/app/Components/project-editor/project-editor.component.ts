import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Sevices/auth.service';

import { MainEngine } from '../../Engine/MainEngine';
declare const MyTest: any;

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.css'],
})
export class ProjectEditorComponent implements OnInit {
  EngineInstance: MainEngine = new MainEngine();

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}
}
