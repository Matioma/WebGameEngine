import { ProjectService } from 'src/app/Sevices/ProjectService/project.service';
import { MainEngine } from '../MainEngine';
import { GameObject, GameProject, ProjectModel } from './Core';

interface UIActions {
  SelectObject(gameObject: GameObject);
  CreateObject(gameObject: GameObject);
}

export class EditorController implements UIActions {
  private static instance: EditorController;

  private projectModel: ProjectModel;
  private selectedScriptKey: String;

  constructor(gameProject: ProjectModel) {
    if (EditorController.instance) {
      console.error(`Instance of EditorController already created`);
      return;
    }
    EditorController.instance = this;
    this.projectModel = gameProject;
  }

  static getInstance() {
    if (EditorController.instance) return this.instance;
    throw new Error('EditorController not initialized');
  }

  SelectObject(gameObject: GameObject) {
    this.projectModel.selectedObject = gameObject;
    // console.log(gameObject);
  }

  CreateObject(gameObject: GameObject) {
    this.projectModel.project.scene.AddChild(new GameObject('AWESOME'));
  }

  OpenScript(key) {
    this.selectedScriptKey = key;
    console.log(key);
  }

  SaveFile() {
    this.selectedScriptKey = null;
  }
  CloseFile() {
    this.selectedScriptKey = null;
  }
}
