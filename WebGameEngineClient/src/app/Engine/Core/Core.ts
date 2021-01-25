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
