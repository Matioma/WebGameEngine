import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-file-icon',
  templateUrl: './file-icon.component.html',
  styleUrls: ['./file-icon.component.css'],
})
export class FileIconComponent implements OnInit {
  @Input() file;

  constructor() {}

  ngOnInit(): void {}
}
