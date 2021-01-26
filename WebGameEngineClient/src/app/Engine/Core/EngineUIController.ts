import { MainEngine } from '../MainEngine';
import { GameObject, GameProject } from './Core';

interface UIActions {
  SelectObject(gameObject: GameObject);
  CreateObject(gameObject: GameObject);
}

export class EngineUIController implements UIActions {
  gameProject: GameProject;

  constructor(engine: GameProject) {
    this.gameProject = engine;
  }

  SelectObject(gameObject: GameObject) {}

  CreateObject(gameObject: GameObject) {
    this.gameProject.scene.AddChild(new GameObject('AWESOME'));
  }
}

export class EditorController {
  private static instance: EditorController;

  id = 0;

  constructor(id) {
    if (EditorController.instance) {
      throw new Error(`Instance of EditorController already created`);
      return;
    }
    this.id = 0;
  }

  static getInstance() {
    EditorController.instance =
      EditorController.instance || new EditorController(3);
    return this.instance;
  }
}
