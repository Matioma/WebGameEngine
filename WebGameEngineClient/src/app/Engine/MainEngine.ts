import { GameObject, Scene } from './Core/Core';
import { Renderer } from './Renderer/Renderer';

export class MainEngine {
  renderer: Renderer = new Renderer();
  curentScene: Scene = new Scene('Scene1');

  constructor() {
    this.Run();

    let obj: GameObject = new GameObject('Cool Stuff');

    this.curentScene.AddChild(obj);
    obj = new GameObject('Cool Stuff 2');

    this.curentScene.AddChild(obj);
    obj = new GameObject('Cool Stuff 4');
    this.curentScene.AddChild(obj);
    obj = new GameObject('Cool Stuff 5');
    this.curentScene.AddChild(obj);
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
