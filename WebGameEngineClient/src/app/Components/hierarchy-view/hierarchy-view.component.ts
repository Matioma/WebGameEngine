import { Component, OnInit, Input } from '@angular/core';
import { Scene } from 'src/app/Engine/Core/Core';

@Component({
  selector: 'app-hierarchy-view',
  templateUrl: './hierarchy-view.component.html',
  styleUrls: ['./hierarchy-view.component.css'],
})
export class HierarchyViewComponent implements OnInit {
  @Input() projectData: Scene;

  constructor() {}

  ngOnInit(): void {}

  CreateGameObject() {}
}
