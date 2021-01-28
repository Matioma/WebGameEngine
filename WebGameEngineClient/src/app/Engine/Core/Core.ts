import { Component } from '@angular/core';
// import { Script } from 'vm';
import { MainEngine } from '../MainEngine';
import { Renderer } from '../Renderer/Renderer';

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

    this.scripts.Transform = `()=>{
      return class Tranform{
        constructor(){
          this.x = 0;
          this.y = 0;
          this.z = 0;
        }

        update(){

        }

        draw(){
          
        }
      }
    }`;
    this.scripts.Mesh = `()=>{
      return class Mesh{
        constructor(){
          this.x = 0;
          this.y = 0;
          this.z = 0;
        }

        update(){
          console.log("this is mesh");
        }

        draw(){
          console.log("this is Mesh");
        }
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
  behaviours: any[] = [];
  children: GameObject[] = [];
  name: String = '';

  constructor(name: String = 'gameObject') {
    this.name = name;
  }
  update() {
    this.behaviours.forEach((component) => {
      component.update(MainEngine.GetInstance().getDeltaTime());
      component.draw(Renderer.getInstance().gl);
    });
  }

  AddChild(newObject: GameObject) {
    this.children.push(newObject);
  }
  AddBehaviour(newComponent: string, gameProject: GameProject): any {
    if (!gameProject.scripts[newComponent]) {
      console.error(`Script ${newComponent}   is not defined`);
    } else {
      //Warning of multiple component additions
      if (this.behaviours.includes({ componentName: newComponent })) {
        console.warn(
          `component ${newComponent} already attached to the gameObject`
        );
      }

      //Validate Script
      try {
        eval(gameProject.scripts[newComponent])();
      } catch (e) {
        if (e instanceof SyntaxError) {
          console.error(
            e.message +
              ` \n Wrong syntax in component definition  when adding "${newComponent}" component to ${this.name} gameobject`
          );
          console.error(
            `script deffinition was \n ${gameProject.scripts[newComponent]}`
          );
        }
        return;
      }

      //Compile Script
      let ComponentDefinition = eval(gameProject.scripts[newComponent])();
      let newBehavior = new ComponentDefinition();
      newBehavior.owner = this;
      newBehavior.componentName = newComponent;

      console.log(this.behaviours);
      this.behaviours.push(newBehavior);
      return newBehavior;
    }
  }

  GetBehaviour(name: string) {
    //console.log(this.behaviours);
    let foundBehaviour = null;

    this.behaviours.forEach((behaviour) => {
      console.log(behaviour.componentName == name);
      if (behaviour.componentName == name) {
        foundBehaviour = behaviour;
        //return behaviour;
      }
    });
    return foundBehaviour;
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
