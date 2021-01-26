import { Component, OnInit, Input } from '@angular/core';
import { GameObject } from 'src/app/Engine/Core/Core';
import { EditorController } from 'src/app/Engine/Core/UIController';

@Component({
  selector: 'app-hierarchy-element',
  templateUrl: './hierarchy-element.component.html',
  styleUrls: ['./hierarchy-element.component.css'],
})
export class HierarchyElementComponent implements OnInit {
  @Input() object: GameObject;

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    EditorController.getInstance().SelectObject(this.object);
  }
}
