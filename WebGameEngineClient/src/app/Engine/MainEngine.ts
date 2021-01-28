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

    this.compileCode(project);
  }

  InitializeRenderer(canvas) {
    // console.log(canvas);
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

    //UpdateScene
    this.projectModel.project.scene.children.forEach((element) => {
      element.update();
    });

    // this.projectModel.project.scene.children.forEach((element) => {
    //   element.draw();
    // });

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

        element.behaviours.forEach((behaviour) => {
          let behaviourObject = object.AddBehaviour(
            behaviour.componentName,
            gameProject
          );
          for (const property in behaviourObject) {
            behaviour[property] = behaviourObject[property];
          }
        });
        gameProject.scene.AddChild(object);
      });
    }

    return gameProject;
  }

  Delete() {
    MainEngine.instance = null;
    EditorController.getInstance().Delete();
  }
}
