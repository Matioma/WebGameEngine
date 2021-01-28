import { Component, OnInit, Input } from '@angular/core';
import { Behaviour, GameObject } from 'src/app/Engine/Core/Core';
import { EditorController } from 'src/app/Engine/Core/UIController';
import { MainEngine } from 'src/app/Engine/MainEngine';

@Component({
  selector: 'app-behaviour-view',
  templateUrl: './behaviour-view.component.html',
  styleUrls: ['./behaviour-view.component.css'],
})
export class BehaviourViewComponent implements OnInit {
  @Input() component: any;

  constructor() {}

  ngOnInit(): void {}

  objectKeys(obj) {
    return Object.keys(obj);
  }

  RemoveCoponent() {
    let selectedObject: GameObject = MainEngine.GetInstance().projectModel
      .selectedObject;

    const index = selectedObject.behaviours.indexOf(this.component);
    // console.log(index);
    if (index > -1) {
      selectedObject.behaviours.splice(index, 1);
    }
  }
  mychange(event, key) {
    this.component[key] = event;
    console.log(event, key);
  }
  acceptableItem(item) {
    if (item.key == 'componentName' || item.key == 'owner') return false;
    return true;
  }
}
