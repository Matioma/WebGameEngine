import { Component, OnInit, Input } from '@angular/core';
import { GameObject, ProjectModel, Scene } from 'src/app/Engine/Core/Core';
import { EditorController } from 'src/app/Engine/Core/UIController';

@Component({
  selector: 'app-hierarchy-view',
  templateUrl: './hierarchy-view.component.html',
  styleUrls: ['./hierarchy-view.component.css'],
})
export class HierarchyViewComponent implements OnInit {
  @Input() projectModel: ProjectModel;

  constructor() {}

  ngOnInit(): void {}

  CreateGameObject() {
    EditorController.getInstance().CreateObject(
      new GameObject('AwesomeNewObject')
    );
  }
}
