import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { Settings, Army } from '../../models';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public enableBattle: boolean;
  public settings: Settings;
  public showAttrition: boolean;

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

    let totalFirst = this.settings.armyA.firstUnit.size + this.settings.armyB.firstUnit.size;
    var newFirstA = (this.settings.armyA.firstUnit.size / totalFirst) * 100;
    if (newFirstA >= 10 && newFirstA <= 90) {
      this.settings.armyA.firstUnit.width = newFirstA;
    } else if (newFirstA < 10) {
      this.settings.armyA.firstUnit.width = 10;
    } else if (newFirstA > 90) {
      this.settings.armyA.firstUnit.width = 90;
    }
    var newFirstB = (this.settings.armyB.firstUnit.size / totalFirst) * 100;
    if (newFirstB >= 10 && newFirstB <= 90) {
      this.settings.armyB.firstUnit.width = newFirstB;
    } else if (newFirstB < 10) {
      this.settings.armyB.firstUnit.width = 10;
    } else if (newFirstB > 90) {
      this.settings.armyB.firstUnit.width = 90;
    }

    let totalSecond = this.settings.armyA.secondUnit.size + this.settings.armyB.secondUnit.size;
    var newFirstA = (this.settings.armyA.secondUnit.size / totalSecond) * 100;
    if (newFirstA >= 10 && newFirstA <= 90) {
      this.settings.armyA.secondUnit.width = newFirstA;
    } else if (newFirstA < 10) {
      this.settings.armyA.secondUnit.width = 10;
    } else if (newFirstA > 90) {
      this.settings.armyA.secondUnit.width = 90;
    }
    var newFirstB = (this.settings.armyB.secondUnit.size / totalSecond) * 100;
    if (newFirstB >= 10 && newFirstB <= 90) {
      this.settings.armyB.secondUnit.width = newFirstB;
    } else if (newFirstB < 10) {
      this.settings.armyB.secondUnit.width = 10;
    } else if (newFirstB > 90) {
      this.settings.armyB.secondUnit.width = 90;
    }

    let totalThird = this.settings.armyA.thirdUnit.size + this.settings.armyB.thirdUnit.size;
    var newFirstA = (this.settings.armyA.thirdUnit.size / totalThird) * 100;
    if (newFirstA >= 10 && newFirstA <= 90) {
      this.settings.armyA.thirdUnit.width = newFirstA;
    } else if (newFirstA < 10) {
      this.settings.armyA.thirdUnit.width = 10;
    } else if (newFirstA > 90) {
      this.settings.armyA.thirdUnit.width = 90;
    }
    var newFirstB = (this.settings.armyB.thirdUnit.size / totalThird) * 100;
    if (newFirstB >= 10 && newFirstB <= 90) {
      this.settings.armyB.thirdUnit.width = newFirstB;
    } else if (newFirstB < 10) {
      this.settings.armyB.thirdUnit.width = 10;
    } else if (newFirstB > 90) {
      this.settings.armyB.thirdUnit.width = 90;
    }

    this.showAttrition = true;
    setTimeout(() => this.showAttrition = false, 1500);

  }

  private gameOver(winner: Army): void {
    this.settings.winner = winner;
    let settings: NavigationExtras = {
      state: this.settings
    };
    this.router.navigate(['/result'], settings);
  }

  public ngOnInit(): void {
    this.enableBattle = true;
    this.showAttrition = false;
  }

}
