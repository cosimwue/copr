import { Component, OnInit } from '@angular/core';

import { ElectronService } from '../../providers/electron.service';
import { Unit, Settings, Army } from '../../models';
import { Router } from '@angular/router';

var single = [
  {
    "name": "Germany",
    "value": 8940000
  },
  {
    "name": "USA",
    "value": 5000000
  },
  {
    "name": "France",
    "value": 7200000
  }
];

var multi = [
  {
    "name": "Germany",
    "series": [
      {
        "name": "2010",
        "value": 7300000
      },
      {
        "name": "2011",
        "value": 8940000
      }
    ]
  },

  {
    "name": "USA",
    "series": [
      {
        "name": "2010",
        "value": 7870000
      },
      {
        "name": "2011",
        "value": 8270000
      }
    ]
  },

  {
    "name": "France",
    "series": [
      {
        "name": "2010",
        "value": 5000002
      },
      {
        "name": "2011",
        "value": 5800000
      }
    ]
  }
];




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

  view: any[] = [800, 400];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.settings = navigation.extras.state as {
      test: string
    };


    Object.assign(this, {single, multi})
  }

  /*
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
  }*/

  public ngOnInit(): void {
    let armyA = new Army('England', 1000);
    let armyB = new Army('France', 1000);
    let law = 'lanchester';
    let implementation = 'battle(attacker: Unit, attacked: Unit): void {\n    // Write your code in this block, for example:\n    attacked.size = attacked.size - attacker.force;\n}';
    this.settings = new Settings(armyA, armyB, law, implementation);

    /*this.a = new Unit('England', 500, 0.7);
    this.b = new Unit('France', 800, 0.6);
    this.countdownConfig = {'leftTime': 120, 'template': '$!m!:$!s!'}*/
  }

}
