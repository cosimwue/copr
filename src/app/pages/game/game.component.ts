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
  public latestFirstA: any = {size: 50, combat: false};
  public latestFirstB: any = {size: 50, combat: false};
  public latestFirstTotal: number;


  constructor(private router: Router, private toastr: ToastrService) {
    const navigation = this.router.getCurrentNavigation();
    let settings = navigation.extras.state;
    /*this.settings = new Settings(
      settings.armyA,
      settings.armyB,
      settings.law,
      settings.implementation,
      settings.timePerBattle
    );*/
    let armyA = new Army('England', 1000, 0.5, 0.5);
    let armyB = new Army('France', 1000, 0.5, 0.5);
    let law = 'lanchester';
    let implementation = 'TODO';
    let timePerBattle = 120;
    this.settings = new Settings(armyA, armyB, law, implementation, timePerBattle);
  }

  public updateSize(report: any): any {
    let totalA = 0;
    totalA += report.a1;
    totalA += report.a2;
    totalA += report.a3;
    let newScoreA = this.settings.armyA.size - totalA;
    if (newScoreA < 0) {
      this.settings.armyA.size = 0;
    } else {
      this.settings.armyA.size = newScoreA;
    }
    this.settings.armyA.history.push(this.settings.armyA.size)

    let totalB = 0;
    totalB += report.b1;
    totalB += report.b2;
    totalB += report.b3;
    let newScoreB = this.settings.armyB.size - totalB;
    if (newScoreB < 0) {
      this.settings.armyB.size = 0;
    } else {
      this.settings.armyB.size = newScoreB;
    }
    this.settings.armyB.history.push(this.settings.armyB.size)


    this.settings.armyA.firstUnit.size = this.settings.armyA.firstUnit.size - report.a1;
    if (this.settings.armyA.firstUnit.size <= 0) {
      this.gameOver(this.settings.armyB)
      return
    }
    this.settings.armyA.secondUnit.size = this.settings.armyA.secondUnit.size - report.a2;
    if (this.settings.armyA.secondUnit.size <= 0) {
      this.gameOver(this.settings.armyB)
      return
    }
    this.settings.armyA.thirdUnit.size = this.settings.armyA.thirdUnit.size - report.a3;
    if (this.settings.armyA.thirdUnit.size <= 0) {
      this.gameOver(this.settings.armyB)
      return
    }

    this.settings.armyB.firstUnit.size = this.settings.armyB.firstUnit.size - report.b1;
    if (this.settings.armyB.firstUnit.size <= 0) {
      this.gameOver(this.settings.armyA)
      return
    }
    this.settings.armyB.secondUnit.size = this.settings.armyB.secondUnit.size - report.b2;
    if (this.settings.armyB.secondUnit.size <= 0) {
      this.gameOver(this.settings.armyA)
      return
    }
    this.settings.armyB.thirdUnit.size = this.settings.armyB.thirdUnit.size - report.b3;
    if (this.settings.armyB.thirdUnit.size <= 0) {
      this.gameOver(this.settings.armyA)
      return
    }

    this.latestFirstTotal = this.settings.armyA.firstUnit.size + this.settings.armyB.firstUnit.size;
    this.latestFirstA.size = this.settings.armyA.firstUnit.size / this.latestFirstTotal * 100;
    this.latestFirstB.size = this.settings.armyB.firstUnit.size / this.latestFirstTotal * 100;

  }


  private gameOver(winner: Army): void {
    let heading = 'War is over!';
    let message = `${winner.name} has won the war.`;
    this.toastr.success(message, heading, {disableTimeOut: true, positionClass: 'toast-bottom-center'});
  }


  public ngOnInit(): void {
    this.enableBattle = true;
  }

}
