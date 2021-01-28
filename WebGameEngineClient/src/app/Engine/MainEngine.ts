import { GameObject, GameProject, ProjectModel, Scene } from './Core/Core';
import { EditorController } from './Core/UIController';
import { Renderer } from './Renderer/Renderer';

export class MainEngine {
  static instance: MainEngine;

  renderer: Renderer = new Renderer();

  projectModel: ProjectModel;
  editorController: EditorController;

  lastTime = 0;
  time = 0;
  static deltaTime = 0;

  isPaused = true;

  constructor(project: GameProject) {
    if (MainEngine.instance) {
      console.error('Main Engine Already initialized');
      return;
    }
    MainEngine.instance = this;

    this.compileCode(project);
    this.time = Date.now();
    this.lastTime = this.time;
  }

  togglePause() {
    this.isPaused = !this.isPaused;
  }
  InitializeRenderer(canvas) {
    // console.log(canvas);
    this.renderer.Initialize(canvas);
  }

  getDeltaTime() {
    return (this.time - this.lastTime) / 1000.0;
  }
  Run() {
    this.Loop();
  }
  Loop = () => {
    if (!this.isPaused) {
      if (this.projectModel.project == undefined) {
        console.error('project was not initilized');
        return;
      }
      this.renderer.clearScreen(0, 0, 0);
      //UpdateScene
      this.projectModel.project.scene.children.forEach((element) => {
        element.update();
      });
      this.lastTime = this.time;
      this.time = Date.now();
    }
    requestAnimationFrame(this.Loop);

    //MainEngine.deltaTime = ;
    //console.log(MainEngine.deltaTime);
  };

  static GetInstance(): MainEngine {
    if (MainEngine.instance) return MainEngine.instance;
    console.error('Main engine not initilized yet');
    return null;
  }

  compileCode(projectData) {
    // console.log(projectData);

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
        element.behaviours.forEach((behaviour) => {
          let newBehaviour = object.AddBehaviour(
            behaviour.componentName,
            gameProject
          );
          for (const property in newBehaviour) {
            if (behaviour[property]) {
              newBehaviour[property] = behaviour[property];
            }
          }
        });
        gameProject.scene.AddChild(object);
      });
    }

    console.log(gameProject);
    return gameProject;
  }

  Delete() {
    MainEngine.instance = null;
    EditorController.getInstance().Delete();
  }
}
