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
