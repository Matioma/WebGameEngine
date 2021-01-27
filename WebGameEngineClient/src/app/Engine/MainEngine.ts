import { GameObject, GameProject, ProjectModel, Scene } from './Core/Core';
import { EditorController } from './Core/UIController';
import { Renderer } from './Renderer/Renderer';

export class MainEngine {
  static instance: MainEngine;

  renderer: Renderer = new Renderer();

  projectModel: ProjectModel;
  editorController: EditorController;

  constructor(project: GameProject) {
    if (MainEngine.instance) {
      console.error('Main Engine Already initialized');
      return;
    }
    MainEngine.instance = this;

    this.projectModel = new ProjectModel(project);
    this.editorController = new EditorController(this.projectModel);
  }

  InitializeRenderer(canvas) {
    this.renderer.Initialize(canvas);
  }

  Run() {
    this.Loop();
  }
  Loop = () => {
    if (this.projectModel.project == undefined) {
      console.error('project was not initilized');
      return;
    }
    if (this.projectModel.project.scene) {
    }
    requestAnimationFrame(this.Loop);
  };

  static GetInstance(): MainEngine {
    if (MainEngine.instance) return MainEngine.instance;
    console.error('Main engine not initilized yet');
    return null;
  }
}
