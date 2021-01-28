import { Component, OnInit, Input } from '@angular/core';
import { GameObject } from 'src/app/Engine/Core/Core';
import { EditorController } from 'src/app/Engine/Core/UIController';
import { MainEngine } from 'src/app/Engine/MainEngine';

@Component({
  selector: 'app-inspector-view',
  templateUrl: './inspector-view.component.html',
  styleUrls: ['./inspector-view.component.css'],
})
export class InspectorViewComponent implements OnInit {
  @Input() selectedObject: GameObject = new GameObject('');

  showDropDown: boolean = false;
  keys: String[] = [];

  static instance;

  constructor() {
    InspectorViewComponent.instance = this;
  }

  ngOnInit(): void {
    // this.parseScripts();
    for (const componentName in MainEngine.GetInstance().projectModel.project
      .scripts) {
      this.keys.push(componentName);
    }
  }

  parseScripts() {
    this.keys = [];
    this.ngOnInit();
  }

  ShowComponents() {
    this.showDropDown = !this.showDropDown;
  }

  selectComponent($event) {
    this.selectedObject.AddBehaviour(
      $event.target.value,
      MainEngine.GetInstance().projectModel.project
    );
  }

  Delete() {
    EditorController.getInstance().RemoveObject(this.selectedObject);
  }
}
