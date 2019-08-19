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
  @Output('lossReport') lossReport: EventEmitter<any>;
  public unitA: Unit;
  public unitB: Unit;
  public countdownConfig: any;

  constructor(private modalService: NgbModal) {
    this.lossReport = new EventEmitter<any>();
  }

  public open(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  public startBattle(attack: string): void {
    this.modalService.dismissAll();
    if (this.settings.law === 'lanchester') {
      var loss = this.lanchesterLaw(this.unitA, this.unitB)
    } else if (this.settings.law === 'osipov') {
      console.log("osipov")
    } else if (this.settings.law === 'custom') {
      var battle = eval(this.settings.implementation);
      // TODO
    }
    this.lossReport.emit(loss);
  }

  public lanchesterLaw(a: Unit, b: Unit): any {
    if (a.size > 0 && b.size > 0) {
      var lossA = this.lanchesterLoss(b, a);
      var lossB = this.lanchesterLoss(a, b);
      if (a.size < 0) {
        a.size = 0;
      }
      if (b.size < 0) {
        b.size = 0;
      }
    }
    return {'a': lossA, 'b': lossB};
  }

  public lanchesterLoss(attacker: Unit, attacked: Unit): number {
    return attacker.size * attacker.power;
  }

  public ngOnInit(): void {
    this.unitA = new Unit(100, 0.8);
    this.unitB = new Unit(200, 0.5);
    this.countdownConfig = {'leftTime': 120, 'template': '$!m!:$!s!'};
  }

}
