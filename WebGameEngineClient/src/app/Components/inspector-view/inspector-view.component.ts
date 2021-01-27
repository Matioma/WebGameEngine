import { Component, OnInit, Input } from '@angular/core';
import { GameObject } from 'src/app/Engine/Core/Core';
import {} from '@angular/material/select';
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

  constructor() {}

  ngOnInit(): void {
    // console.log(MainEngine.GetInstance().projectModel.project.scripts);
    for (const componentName in MainEngine.GetInstance().projectModel.project
      .scripts) {
      this.keys.push(componentName);
    }

    // if (this.selectedObject == undefined) {
    // this.selectedObject.name = '';
    // }
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
}
