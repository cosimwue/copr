export class Unit {
  size: number
  power: number

  constructor(size: number, power: number) {
    this.size = size;
    this.power = power;
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
    this.firstUnit = {size: 0, combat: false};
    this.secondUnit = {size: 0, combat: false};
    this.thirdUnit = {size: 0, combat: false};
  }
}
