export class Unit {
  size: number
  power: number
  combatPower: number
  defencePower: number
  combat: boolean

  constructor(size: number, combatPower: number, defencePower: number, combat: boolean) {
    this.size = size;
    this.combatPower = combatPower;
    this.defencePower = defencePower;
    this.combat = combat;
  }
}


export class Army {
  name: string
  size: number
  history: Array<number>
  combatPower: number
  defencePower: number
  firstUnit: any
  secondUnit: any
  thirdUnit: any

  constructor(name: string, size: number, combatPower: number, defencePower: number) {
    this.name = name;
    this.size = size;
    this.history = [size];
    this.combatPower = combatPower;
    this.defencePower = defencePower;
    this.firstUnit = new Unit(size / 100 * 10, combatPower, defencePower, false);
    this.secondUnit = new Unit(size / 100 * 10, combatPower, defencePower, false);
    this.thirdUnit = new Unit(size / 100 * 10, combatPower, defencePower, false);
  }
}
