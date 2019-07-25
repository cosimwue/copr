import { Component, OnInit } from '@angular/core';

import { ElectronService } from './providers/electron.service';
import { Unit } from './models';
import { AppConfig } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public electronService: ElectronService) {
    if (electronService.isElectron()) {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }

  public timeSteps(n: number): IterableIterator<number> {
    return Array(n).keys();
  }

  public osipovProbability(attacker: Unit, attacked: Unit): number {
    return attacker.force / attacked.size;
  }

  /*
  public osipovBattle(attacker: Unit, attacked: Unit): Unit[] {
    let probabilityA = this.osipovProbability(a, b);
    let probabilityB = this.osipovProbability(b, a);

  }

  public lanchesterLaw(time: number, a: Unit, b: Unit): Unit[] {
    for (let step of this.timeSteps(time)) {
      if (a.size > 0 && b.size > 0) {
        a.size = a.size - b.force;
        b.size = b.size - a.force;
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
    return [a, b];
  }

  public osipovLaw(time: number, a: Unit, b: Unit): Unit[] {
    for (let step of this.timeSteps(time)) {
      this.osipovBattle(a, b);
      this.osipovBattle(b, a);
    }
    return [a, b];
  }


  for (i in 1:time) {
    prob.r <- prob.osipov(r, size.b1, power.b1, size.b2, power.b2)
    prob.b <- prob.osipov(b, size.r, power.r)

    size.r <- battle.osipov(size.r, coeff.r, prob.r)
    size.b1 <- battle.osipov(size.b1, coeff.b1, prob.b)
    size.b2 <- battle.osipov(size.b2, coeff.b2, prob.b)

    r <- size.r
    b <- size.b1 + size.b2

    r.size <- c(r.size, r)
    b.size <- c(b.size, b)

    if (r == 0 | b == 0) {
      break
    }
  }
  return (data.frame(r=r.size, b=b.size, t=1:length(r.size)))
  }
  */

  public ngOnInit(): void {
    var a = new Unit(500, 0.7)
    var b = new Unit(800, 0.6)
  }
}
