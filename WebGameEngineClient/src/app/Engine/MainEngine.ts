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

    // this.projectModel = new ProjectModel(project);
    // this.editorController = new EditorController(this.projectModel);
    this.compileCode(project);
    // this.projectModel = new ProjectModel(this.ParseData(project));
    // this.editorController = new EditorController(this.projectModel);
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

  compileCode(projectData) {
    this.projectModel = new ProjectModel(this.ParseData(projectData));
    this.editorController = new EditorController(this.projectModel);
  }

  recompile(projectData) {
    this.projectModel = new ProjectModel(this.ParseData(projectData));
    EditorController.getInstance().Delete();
    this.editorController = new EditorController(this.projectModel);
  }

  ParseData(data): GameProject {
    let rawDataGameProject = data;

    let sceneData = new Scene(rawDataGameProject.name);

    let gameProject: GameProject = new GameProject();
    gameProject.scene = sceneData;

    for (var key in rawDataGameProject.scripts) {
      gameProject.scripts[key] = rawDataGameProject.scripts[key];
    }

    if (rawDataGameProject.scene.children != undefined) {
      rawDataGameProject.scene.children.forEach((element) => {
        let object: GameObject = new GameObject(element.name);

        //Adding all behavriours
        element.behaviours.forEach((behaviour) => {
          // console.log(behaviour, 'weird');

          let behaviourObject = object.AddBehaviour(
            behaviour.componentName,
            gameProject
          );
          for (const property in behaviour) {
            behaviourObject[property] = behaviour[property];
          }
        });
        gameProject.scene.AddChild(object);
      });
    }

    return gameProject;
  }

  Delete() {
    MainEngine.instance = null;
  }
}
