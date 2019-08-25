import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Settings, Unit } from '../../models';


@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {
  @Input('settings') settings: Settings;
  @Input('enableBattle') enableBattle: boolean;
  @Output('lossReport') lossReport: EventEmitter<any>;
  public notifications: number[];
  public unitA: Unit;
  public unitB: Unit;
  public countdownConfigA: any;
  public countdownConfigB: any;
  public formDisableA: boolean;
  public formDisableB: boolean;
  public timeLeftA: number;
  public timeLeftB: number;

  constructor(private modalService: NgbModal) {
    this.lossReport = new EventEmitter<any>();
  }

  private getSeconds(n: number): number[] {
    return Array.from({length: n}, (_, k) => k + 1);
  }

  public open(content: any): void {
    this.modalService.open(content, { size: 'lg' });
    this.timeLeftA = this.settings.timePerBattle / 100;
    this.timeLeftB = this.settings.timePerBattle;
    this.formDisableA = false;
    this.formDisableB = false;
    this.countdownConfigA = {
      notify: this.notifications,
      leftTime: this.settings.timePerBattle,
      template: '$!m!:$!s!'
    };
    this.countdownConfigB = {
      notify: this.notifications,
      leftTime: this.settings.timePerBattle,
      template: '$!m!:$!s!'
    };
  }

  public disableA(): void {
    this.formDisableA = true;
    this.countdownConfigA = {
      leftTime: 0,
      template: '$!m!:$!s!'
    };
  }

  public disableB(): void {
    this.formDisableB = true;
    this.countdownConfigB = {
      leftTime: 0,
      template: '$!m!:$!s!'
    };
  }

  public startBattle(): void {
    this.modalService.dismissAll();
    if (this.settings.law === 'lanchester') {
      var loss = this.lanchesterLaw(this.unitA, this.unitB);
    } else if (this.settings.law === 'osipov') {
      var loss = this.osipovLaw(this.unitA, this.unitB);
    } else if (this.settings.law === 'custom') {
      var loss = this.customLaw(this.unitA, this.unitB);
    }
    this.lossReport.emit(loss);
  }

  public lanchesterLaw(a: Unit, b: Unit): any {
    let lossA = this.lanchesterLoss(b);
    let lossB = this.lanchesterLoss(a);
    return {'a': lossA, 'b': lossB};
  }

  public osipovLaw(a: Unit, b: Unit): any {
    let lossA = this.osipovLoss(b, a);
    let lossB = this.osipovLoss(a, b);
    return {'a': lossA, 'b': lossB};
  }

  public customLaw(a: Unit, b: Unit): any {
    let customLoss = eval(this.settings.implementation);
    let lossA = customLoss(b, a);
    let lossB = customLoss(a, b);
    return {'a': lossA, 'b': lossB};
  }

  public lanchesterLoss(attacker: Unit): number {
    return attacker.size * attacker.power;
  }

  public osipovLoss(attacker: Unit, attacked: Unit): number {
    return (attacker.power * attacker.size) / attacked.size;
  }

  public updateProgressA(): void {
    this.timeLeftA -= 0.1;
  }

  public updateProgressB(): void {
    this.timeLeftB -= 1;
  }

  public ngOnInit(): void {
    let sizeA = (this.settings.armyA.size / 100) * 10;
    let sizeB = (this.settings.armyB.size / 100) * 10;
    this.unitA = new Unit(sizeA, 0.5);
    this.unitB = new Unit(sizeB, 0.5);
    this.notifications = this.getSeconds(this.settings.timePerBattle);
  }

}
