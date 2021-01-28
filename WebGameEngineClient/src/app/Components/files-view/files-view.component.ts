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

  constructor() {}

  ngOnInit(): void {}

  openFile(scriptKey) {
    EditorController.getInstance().OpenScript(scriptKey);
  }

  ToggleForm() {
    this.showForm = !this.showForm;
  }

  CreateScript() {
    EditorController.getInstance().CreateScript(this.fileName);
  }
}
