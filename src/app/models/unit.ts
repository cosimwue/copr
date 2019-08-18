export class Unit {
  name: string
  size: number
  power: number
  force: number
  history: Array<number>

  constructor(name: string, size: number, power: number) {
    this.name = name;
    this.size = size;
    this.power = power;
    this.force = power * size;
    this.history = [size];
  }
}
