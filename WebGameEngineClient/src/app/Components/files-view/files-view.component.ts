import { Component, OnInit, Input } from '@angular/core';
import { ProjectModel } from 'src/app/Engine/Core/Core';
import { EditorController } from 'src/app/Engine/Core/UIController';

@Component({
  selector: 'app-files-view',
  templateUrl: './files-view.component.html',
  styleUrls: ['./files-view.component.css'],
})
export class FilesViewComponent implements OnInit {
  @Input() projectModel: ProjectModel;

  showForm: boolean = false;
  fileName: string = '';

  scriptSlectedKey;

  constructor() {}

  ngOnInit(): void {}

  openFile(scriptKey) {
    EditorController.getInstance().OpenScript(scriptKey);
  }

  selectKey(key) {
    this.scriptSlectedKey = key;
  }

  DeleteScript() {
    // console.log(`Delete ${this.scriptSlectedKey}`);
    EditorController.getInstance().DeleteScript(this.scriptSlectedKey);
  }

  ToggleForm() {
    this.showForm = !this.showForm;
  }

  CreateScript() {
    if (this.fileName.trim().length > 0) {
      EditorController.getInstance().CreateScript(this.fileName);
    }
    console.error('SCript must have a name');
  }
}
