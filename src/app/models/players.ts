export class Unit {
  size: number
  power: number
  force: number

  constructor(size: number, power: number) {
    this.size = size;
    this.power = power;
    this.force = power * size;
  }
}

export class Army {
  name: string
  size: number
  history: Array<number>

  constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
    this.history = [size];
  }
}
