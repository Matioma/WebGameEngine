import { Component, OnInit, Input } from '@angular/core';
import { Behaviour } from 'src/app/Engine/Core/Core';

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
}
