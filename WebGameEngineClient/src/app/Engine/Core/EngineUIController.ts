import { MainEngine } from '../MainEngine';
import { GameObject } from './Core';

interface UIActions {
  SelectObject(gameObject: GameObject);
  CreateObject(gameObject: GameObject);
}

export class EngineUIController implements UIActions {
  engine: MainEngine;

  constructor(engine: MainEngine) {
    this.engine = engine;
  }

  SelectObject(gameObject: GameObject) {}
  CreateObject(gameObject: GameObject) {
    this.engine.currentScene.AddChild(gameObject);
  }
}
