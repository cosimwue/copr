import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { Settings, Army } from '../../models';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  public settings: Settings;
  public enableBattle: boolean;
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

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    let settings = navigation.extras.state;
    this.settings = new Settings(
      settings.armyA,
      settings.armyB,
      settings.law,
      settings.implementation,
      settings.timePerBattle
    );
  }

    private setupPlot(): void {
    this.autoScale = false;
    this.showXAxis = true;
    this.showYAxis = true;
    this.gradient = false;
    this.showLegend = false;
    this.showXAxisLabel = true;
    this.showYAxisLabel = true;
    this.xScaleMax = this.settings.armyA.history.length - 1;
    this.xAxisLabel = 'Battle';
    this.yAxisLabel = 'Total army size, in persons';
    this.colorScheme = {
      domain: ['#ff6666', '#aec6cf']
    };
    this.data = [
      {
        'name': this.settings.armyA.name,
        'series': []
      },
      {
        'name': this.settings.armyB.name,
        'series': []
      }
    ];
    for (let i = 0; i < this.settings.armyA.history.length ; i++) {
      let item = this.settings.armyA.history[i];
      this.data[0].series.push({
      'name': i,
      'value': item
      })
    }
    for (let i = 0; i < this.settings.armyB.history.length ; i++) {
      let item = this.settings.armyB.history[i];
      this.data[1].series.push({
      'name': i,
      'value': item
      })
    }
  }

  public axisFormat(val) {
    if (val % 1 === 0) {
      return val.toLocaleString();
    } else {
      return '';
    }
  }

  public ngOnInit(): void {
    this.enableBattle = true;
    this.setupPlot();
  }

}
