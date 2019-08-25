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
  wins: number

  constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
    this.history = [size];
    this.wins = 0;
  }
}
