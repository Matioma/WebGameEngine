import { GameObject, Scene } from './Core/Core';
import { Renderer } from './Renderer/Renderer';

export class MainEngine {
  renderer: Renderer = new Renderer();
  currentScene: Scene = new Scene('Scene1');

  constructor() {
    this.Run();
  }
  InitializeRenderer(canvas) {
    this.renderer.Initialize(canvas);
  }

  Run() {
    this.Loop();
  }
  Loop = () => {
    //this.curentScene.update();
    //this.renderer.Draw(this.curentScene);
    requestAnimationFrame(this.Loop);
  };
}
