import { Component, OnInit, Input } from '@angular/core';
import { ProjectModel } from 'src/app/Engine/Core/Core';
import { EditorController } from 'src/app/Engine/Core/UIController';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css'],
})
export class TextEditorComponent implements OnInit {
  @Input() projectData: ProjectModel;
  message: string;

  constructor() {}

  ngOnInit(): void {
    this.message = this.GetScriptText();
  }

  GetScriptText() {
    let key = EditorController.getInstance().selectedScriptKey;
    return this.projectData.project.scripts[key.toString()];
  }

  CloseFile() {
    EditorController.getInstance().CloseFile();
  }
  SaveFile() {
    EditorController.getInstance().SaveFile(this.message);
  }
}
