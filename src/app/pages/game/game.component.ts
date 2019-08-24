import { Component, OnInit } from '@angular/core';

import { ElectronService } from '../../providers/electron.service';
import { Unit, Settings, Army } from '../../models';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public settings: any;
  public data: any;
  public countdownConfig: any;
  public colorScheme: any;
  public autoScale: boolean;
  public showXAxis: boolean;
  public showYAxis: boolean;
  public gradient: boolean;
  public showLegend: boolean;
  public showXAxisLabel: boolean;
  public showYAxisLabel: boolean;
  public xAxisLabel: string;
  public yAxisLabel: string;

  constructor(private router: Router, private toastr: ToastrService) {
    /*const navigation = this.router.getCurrentNavigation();
    this.settings = navigation.extras.state as {
      test: string
    };*/
  }

  public updateSize(loss: any): void {
    this.settings.armyA.size = this.settings.armyA.size - loss.a;
    if (this.settings.armyA.size < 0) {
      this.settings.armyA.size = 0;
    }
    this.data[0].series.push({
      "name": this.data[0].series.length,
      "value": this.settings.armyA.size
    });
    this.settings.armyB.size = this.settings.armyB.size - loss.b;
    if (this.settings.armyB.size < 0) {
      this.settings.armyB.size = 0;
    }
    this.data[1].series.push({
      "name": this.data[1].series.length,
      "value": this.settings.armyB.size
    });
    this.data = [...this.data];
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
    this.toastr.info('Belgium has won a total of 5 battles and has thus also won the war.', 'War is over!', {enableHtml: true, disableTimeOut: true, positionClass: 'toast-bottom-center'});
    let armyA = new Army('Belgien', 500);
    let armyB = new Army('Madagaskar', 580);
    let law = 'lanchester';
    let implementation = 'battle(attacker: Unit, attacked: Unit): void {\n    // Write your code in this block, for example:\n    attacked.size = attacked.size - attacker.force;\n}';
    let timePerBattle = 120;
    this.settings = new Settings(armyA, armyB, law, implementation, timePerBattle);

    this.autoScale = false;
    this.showXAxis = true;
    this.showYAxis = true;
    this.gradient = false;
    this.showLegend = true;
    this.showXAxisLabel = true;
    this.showYAxisLabel = true;
    this.xAxisLabel = 'Battle';
    this.yAxisLabel = 'Army size, in persons';
    this.colorScheme = {
      domain: ['#ff6666', '#aec6cf']
    };

    this.data = [
      {
        "name": this.settings.armyA.name,
        "series": [{
          "name": 1,
          "value": this.settings.armyA.size
        }]
      },
      {
        "name": this.settings.armyB.name,
        "series": [{
          "name": 1,
          "value": this.settings.armyB.size
        }]
      }
    ]
  
  }

}
