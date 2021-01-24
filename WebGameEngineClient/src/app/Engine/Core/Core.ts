import { Console } from 'console';

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
  constructor() {}
  update() {
    console.log('gameObject here');
  }
}
