import { Component, OnInit, Input } from '@angular/core';
import { GameObject } from 'src/app/Engine/Core/Core';

@Component({
  selector: 'app-inspector-view',
  templateUrl: './inspector-view.component.html',
  styleUrls: ['./inspector-view.component.css'],
})
export class InspectorViewComponent implements OnInit {
  @Input() selectedObject: GameObject = new GameObject('');

  constructor() {}

  ngOnInit(): void {
    // if (this.selectedObject == undefined) {
    // this.selectedObject.name = '';
    // }
  }
}
