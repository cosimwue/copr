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





#' time: int used to describe the amount of battle rounds/time units.
#' size.r: int used to describe the size of the side r.
#' power.r: float used to describe the power of the side r.
#' coeff.r: float used to describe bonus/malus (armour, training, position).
#' size.b1: int used to describe the size of the first part of the units on side b.
#' power.b1: float used to describe the power of the first part of the units on side b.
#' coeff.b1: float used to describe bonus/malus (armour, training, position) of a unit of the first part of side b (maximum = 1).
#' size.b2: int used to describe the size of the second part of the units on side b (default = 0).
#' power.b2: float used to describe the power of the second part of the units on side b (default = 0).
#' coeff.b2: float used to describe bonus/malus (armour, training, position) of a unit of the second part of side b (maximum = 1).
