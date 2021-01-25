import { Component, OnInit, Input } from '@angular/core';
import { GameObject, Scene } from 'src/app/Engine/Core/Core';
import { EngineUIController } from 'src/app/Engine/Core/EngineUIController';

@Component({
  selector: 'app-hierarchy-view',
  templateUrl: './hierarchy-view.component.html',
  styleUrls: ['./hierarchy-view.component.css'],
})
export class HierarchyViewComponent implements OnInit {
  @Input() projectData: Scene;
  @Input() controller: EngineUIController;

  constructor() {}

  ngOnInit(): void {}

  CreateGameObject() {
    this.controller.CreateObject(new GameObject('AwesomeNewObject'));
  }
}
