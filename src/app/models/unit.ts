export class Unit {
  size: number
  power: number
  force: number
  history: Array<number>

  constructor(size: number, power: number) {
    this.size = size;
    this.power = power;
    this.force = power * size;
    this.history = [size];
  }
}
