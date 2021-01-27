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

  constructor() {}

  ngOnInit(): void {}

  SaveFile() {}

  GetScriptText() {
    let key = EditorController.getInstance().selectedScriptKey;
    return this.projectData.project.scripts[key.toString()];
  }

  CloseFile() {
    console.log(this.projectData.project.scripts.demo);
    EditorController.getInstance().CloseFile();
  }
}
