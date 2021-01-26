import { Component } from '@angular/core';
// import { Script } from 'vm';
import { MainEngine } from '../MainEngine';
import { EngineUIController } from './EngineUIController';

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
      return class demo {
        constructor() {
          console.log('Awesome');
        }
        Message(Message) {
          console.log(Message);
        }
      };
    };`;
    this.scripts.Mesh = `() => {
      return class mesh {
        constructor() {
          console.log('Awesome');
        }
        Message(Message) {
          console.log(Message);
        }
      };
    };`;

    // let demo = eval(this.scripts.Transform)();
    //console.log(demo());
    // let t: any = new demo();

    //let t = new demo();
    // console.log(t);
    // t.Message('AWESOME');
    // let testClass = this.scripts.Transform();
    // let demo = new testClass();
    // demo.Message('CoOOL');
    // console.log(demo.Message());
  }
}

export class GameObject implements dynamicObject {
  behaviours: Behaviour[] = [];
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
    this.children.forEach((child) => {
      child.update();
    });
  }

  AddChild(newObject: GameObject) {
    this.children.push(newObject);
  }
  AddBehaviour(newComponent: Behaviour) {
    this.behaviours.push(newComponent);
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
