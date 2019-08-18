export class Settings {
    nameA: string
    nameB: string
    sizeA: number
    sizeB: number
    powerA: number
    powerB: number
    law: string
    implementation: string
  
    constructor() {
      this.nameA = 'England';
      this.nameB = 'France';
      this.sizeA = 1000;
      this.sizeB = 500;
      this.powerA = 0.6;
      this.powerB = 0.8;
      this.law = 'lanchester';
      this.implementation = 'battle(attacker: Unit, attacked: Unit): void {\n    // Write your code in this block, for example:\n    attacked.size = attacked.size - attacker.force;\n}'
    }
  }
  