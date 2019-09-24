import { Army } from "./players";

export class Settings {
    armyA: Army
    armyB: Army
    law: string
    implementation: string
    timePerBattle: number
    winner: any;
  
    constructor(armyA: Army, armyB: Army, law: string, implementation: string, winner: string = null) {
      this.armyA = armyA;
      this.armyB = armyB;
      this.law = law;
      this.implementation = implementation;
      this.winner = winner;
    }
  }
