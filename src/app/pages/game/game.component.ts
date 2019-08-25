import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Settings, Army } from '../../models';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public enableBattle: boolean;
  public settings: Settings;
  public data: any[];
  public colorScheme: any;
  public autoScale: boolean;
  public showXAxis: boolean;
  public showYAxis: boolean;
  public gradient: boolean;
  public xScaleMax: number;
  public showLegend: boolean;
  public showXAxisLabel: boolean;
  public showYAxisLabel: boolean;
  public xAxisLabel: string;
  public yAxisLabel: string;

  constructor(private router: Router, private toastr: ToastrService) {
    /*const navigation = this.router.getCurrentNavigation();
    let settings = navigation.extras.state;
    this.settings = new Settings(
      settings.armyA,
      settings.armyB,
      settings.law,
      settings.implementation,
      settings.timePerBattle
    );*/
    let armyA = new Army('England', 1000);
    let armyB = new Army('France', 1000);
    let law = 'lanchester';
    let implementation = 'TODO';
    let timePerBattle = 120;
    this.settings = new Settings(armyA, armyB, law, implementation, timePerBattle);
  }

  public updateSize(loss: any): void {
    if (loss.b > loss.a) {
      this.settings.armyA.wins += 1
    } else if (loss.a > loss.b) {
      this.settings.armyB.wins += 1
    }
    this.settings.armyA.size = this.settings.armyA.size - loss.a;
    if (this.settings.armyA.size <= 0) {
      this.settings.armyA.size = 0;
      this.enableBattle = false;
      this.gameOver(this.settings.armyB);
    }
    this.data[0].series.push({
      "name": this.data[0].series.length,
      "value": this.settings.armyA.size
    });
    this.settings.armyB.size = this.settings.armyB.size - loss.b;
    if (this.settings.armyB.size < 0) {
      this.settings.armyB.size = 0;
      this.enableBattle = false;
      this.gameOver(this.settings.armyA);
    }
    this.data[1].series.push({
      "name": this.data[1].series.length,
      "value": this.settings.armyB.size
    });
    this.data = [...this.data];
  }

  private gameOver(winner: Army): void {
    let heading = 'War is over!';
    let message = `${winner.name} has won a total of ${winner.wins} battles and has thus also won the war.`;
    this.toastr.success(message, heading, {disableTimeOut: true, positionClass: 'toast-bottom-center'});
  }

  private setupPlot(): void {
    this.autoScale = false;
    this.showXAxis = true;
    this.showYAxis = true;
    this.gradient = false;
    this.showLegend = false;
    this.showXAxisLabel = true;
    this.showYAxisLabel = true;
    this.xScaleMax = 20;
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
    ];
  }

  public ngOnInit(): void {
    this.enableBattle = true;
    this.setupPlot();
  }

}
