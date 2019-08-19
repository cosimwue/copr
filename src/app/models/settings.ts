import { Army } from "./players";

export class Settings {
    armyA: Army
    armyB: Army
    law: string
    implementation: string
    timePerBattle: number
  
    constructor(armyA: Army, armyB: Army, law: string, implementation: string, timePerBattle: number) {
      this.armyA = armyA;
      this.armyB = armyB;
      this.law = law;
      this.implementation = implementation;
      this.timePerBattle = timePerBattle;
    }
  }
