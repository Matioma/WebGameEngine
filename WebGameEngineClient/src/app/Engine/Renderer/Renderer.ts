import { GameObject } from '../Core/Core';
export class Renderer {
  canvas;
  constructor() {}
  Initialize(canvas) {
    this.canvas = canvas;
    console.log(this.canvas);
  }

  Draw(scene: GameObject) {
    console.log('Drawing the scene ', scene);
  }
}
