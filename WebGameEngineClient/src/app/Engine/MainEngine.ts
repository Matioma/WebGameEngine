import { GameObject, GameProject, Scene } from './Core/Core';
import { Renderer } from './Renderer/Renderer';

export class MainEngine {
  renderer: Renderer = new Renderer();
  project: GameProject;

  constructor(project: GameProject) {
    this.project = project;
    // this.Run();
  }
  InitializeRenderer(canvas) {
    this.renderer.Initialize(canvas);
  }

  Run() {
    this.Loop();
  }
  Loop = () => {
    if (this.project == undefined) {
      console.error('project was not initilized');
      return;
    }
    if (this.project.scene) {
    }

    requestAnimationFrame(this.Loop);
  };
}
