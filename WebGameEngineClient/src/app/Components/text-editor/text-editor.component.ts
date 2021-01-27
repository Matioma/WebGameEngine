import { Component, OnInit } from '@angular/core';
import { EditorController } from 'src/app/Engine/Core/UIController';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css'],
})
export class TextEditorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  SaveFile() {}

  CloseFile() {
    EditorController.getInstance().CloseFile();
  }
}
