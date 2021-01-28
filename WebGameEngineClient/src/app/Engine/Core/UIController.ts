import { InspectorViewComponent } from 'src/app/Components/inspector-view/inspector-view.component';
import { ProjectService } from 'src/app/Sevices/ProjectService/project.service';
import { MainEngine } from '../MainEngine';
import { GameObject, GameProject, ProjectModel } from './Core';

interface UIActions {
  SelectObject(gameObject: GameObject);
  CreateObject(gameObject: GameObject);
}

export class EditorController implements UIActions {
  private static instance: EditorController;

  projectModel: ProjectModel;
  selectedScriptKey: string;

  constructor(gameProject: ProjectModel) {
    if (EditorController.instance) {
      console.error(`Instance of EditorController already created`);
      return;
    }
    EditorController.instance = this;
    this.projectModel = gameProject;
  }

  Delete() {
    EditorController.instance = null;
  }

  RemoveObject(object: GameObject) {
    let sceneObjects = this.projectModel.project.scene;
    const index = sceneObjects.children.indexOf(object);
    if (index > -1) {
      sceneObjects.children.splice(index, 1);
      this.projectModel.selectedObject = null;
    }
  }

  static getInstance() {
    if (EditorController.instance) return this.instance;
    // console.error()
    return null; //Error('EditorController not initialized');
  }

  SelectObject(gameObject: GameObject) {
    this.projectModel.selectedObject = gameObject;
  }

  CreateObject(gameObject: GameObject) {
    this.projectModel.project.scene.AddChild(new GameObject('AWESOME'));
  }

  OpenScript(key) {
    this.selectedScriptKey = key;
    console.log(key);
  }

  SaveFile(sourceCode: string) {
    let compileFailed: boolean = false;

    try {
      let t = eval(sourceCode)();
    } catch (e) {
      compileFailed = true;
      console.error('Failed to compile Script', e);
    }

    if (!compileFailed) {
      this.projectModel.project.scripts[this.selectedScriptKey] = sourceCode;
      this.selectedScriptKey = null;
      console.log(this.projectModel.project);
    }

    MainEngine.GetInstance().recompile(
      MainEngine.GetInstance().projectModel.project
    );
  }
  CloseFile() {
    this.selectedScriptKey = null;
  }

  CreateScript(name: string) {
    let defaultClassDefinition = `
      ()=>{
        return class ${name}{
          constructor(){
            this.test ="tet";
          }
          update(){
            console.log("Updating");
          }
          draw(){
            console.log("Drawing");
          }

        }
      }
    `;
    this.projectModel.project.CreateComponent(name, defaultClassDefinition);
    InspectorViewComponent.instance.parseScripts();
  }

  DeleteScript(key) {
    delete this.projectModel.project.scripts[key];
    console.log(this.projectModel.project);
  }
}
