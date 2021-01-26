import { Component } from '@angular/core';
// import { Script } from 'vm';
import { MainEngine } from '../MainEngine';

export class Core {
  constructor() {
    console.log('Core initilized');
  }
}

interface dynamicObject {
  update(): void;
}

export class Behaviour implements dynamicObject {
  constructor() {}

  update() {
    console.log('Behaviour Updated');
  }
}

export interface projectData {
  _id: String;
  name: String;
  scripts: { [key: string]: string };
  scene: Scene;
}

export class GameProject implements projectData {
  _id: String = '';
  name: String;
  scripts: { [key: string]: string } = {};

  scene: Scene;

  constructor() {
    this.scene = new Scene('Default scene');

    this.scripts.Transform = `() => {
      return class transform {
        constructor() {
          console.log('Transform Class Created');
        }
        update(){

        }
      }
    }`;
    this.scripts.demo = `()=>{ 
      return class Test{
        Run(){console.log('Run'))}
      }
    }`;
  }

  CreateComponent(name: string, functionDefinition: string) {
    if (this.scripts[name]) {
      console.error(`The component ${name} was already defined in the project`);
      return;
    }
    this.scripts[name] = functionDefinition;
  }
}

export class GameObject implements dynamicObject {
  componentsNames: String[] = [];
  private behaviours: any[] = [];
  children: GameObject[] = [];
  name: String = '';

  constructor(name: String = 'gameObject') {
    this.name = name;
  }
  update() {
    this.behaviours.forEach((component) => {
      component.update();
    });
    console.log('gameObject here');
  }

  AddChild(newObject: GameObject) {
    this.children.push(newObject);
  }
  AddBehaviour(componentName: string, gameProject: GameProject) {
    if (!gameProject.scripts[componentName]) {
      console.error(
        `Script with this Component ${componentName} is not defined`
      );
    } else {
      let newComponent = eval(gameProject.scripts[componentName])();
      this.behaviours.push(new newComponent());
      this.componentsNames.push(componentName);
    }
  }
}
export class Scene extends GameObject {
  constructor(name: String) {
    super(name);
  }
  update() {
    super.update();
    console.log(`${this.name} is being updated `);
  }
}

export class ProjectModel {
  project: GameProject;

  selectedObject: GameObject;

  constructor(project: GameProject) {
    this.project = project;
  }
}
