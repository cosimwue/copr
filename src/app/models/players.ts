export class Unit {
  size: number
  power: number
  combatPower: number
  defencePower: number
  combat: boolean
  width: number;

  constructor(size: number, combatPower: number, defencePower: number, combat: boolean, width: number) {
    this.size = size;
    this.combatPower = combatPower;
    this.defencePower = defencePower;
    this.combat = combat;
    this.width = width;
  }
}


export class Army {
  name: string
  size: number
  history: Array<number>
  combatPower: number
  defencePower: number
  firstUnit: Unit
  secondUnit: Unit
  thirdUnit: Unit

  constructor(name: string, size: number, combatPower: number, defencePower: number) {
    this.name = name;
    this.size = size;
    this.history = [size];
    this.combatPower = combatPower;
    this.defencePower = defencePower;
    this.firstUnit = new Unit(size / 100 * 10, combatPower, defencePower, false, 50);
    this.secondUnit = new Unit(size / 100 * 10, combatPower, defencePower, false, 50);
    this.thirdUnit = new Unit(size / 100 * 10, combatPower, defencePower, false, 50);
  }
}
