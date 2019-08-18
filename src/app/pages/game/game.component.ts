import { Component, OnInit } from '@angular/core';

import { ElectronService } from '../../providers/electron.service';
import { Unit } from '../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public a: Unit;
  public b: Unit;
  public settings: any;
  public countdownConfig: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.settings = navigation.extras.state as {
      test: string
    };
  }

  public timeSteps(n: number): Array<number> {
    return Array.from(Array(n).keys());
  }

  public lanchesterLaw(time: number, a: Unit, b: Unit): void {
    for (let step of this.timeSteps(time)) {
      if (a.size > 0 && b.size > 0) {
        this.lanchesterBattle(a, b);
        this.lanchesterBattle(b, a);
        if (a.size < 0) {
          a.size = 0;
        }
        if (b.size < 0) {
          b.size = 0;
        }
        a.history.push(a.size);
        b.history.push(b.size);
      } else {
        break;
      }
    }
  }

  public osipovProbability(attacker: Unit, attacked: Unit): number {
    return attacker.force / attacked.size;
  }

  public osipovBattle(attacker: Unit, attacked: Unit): Unit[] {
    let probabilityA = this.osipovProbability(attacker, attacked);
    let probabilityB = this.osipovProbability(attacked, attacker);
    return [attacker, attacked];
  }

  public lanchesterBattle(attacker: Unit, attacked: Unit): void {
    attacked.size = attacked.size - attacker.force;
  }

  public osipovLaw(time: number, a: Unit, b: Unit): void {
    for (let step of this.timeSteps(time)) {
      if (a.size > 0 && b.size > 0) {
        this.osipovBattle(a, b);
        this.osipovBattle(b, a);
        if (a.size < 0) {
          a.size = 0;
        }
        if (b.size < 0) {
          b.size = 0;
        }
        a.history.push(a.size);
        b.history.push(b.size);
      } else {
        break;
      }
    }
  }

  public ngOnInit(): void {
    this.a = new Unit('England', 500, 0.7);
    this.b = new Unit('France', 800, 0.6);
    this.countdownConfig = {'leftTime': 120, 'template': '$!m!:$!s!'}
  }

}
