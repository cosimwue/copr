import { Army } from "./players";

export class Settings {
    armyA: Army
    armyB: Army
    law: string
    implementation: string
  
    constructor(armyA: Army, armyB: Army, law: string, implementation: string) {
      this.armyA = armyA;
      this.armyB = armyB;
      this.law = law;
      this.implementation = implementation;
    }
  }
