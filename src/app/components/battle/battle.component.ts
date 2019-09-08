import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Settings, Unit } from '../../models';

const random = require('random')


@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent {
  @Input('settings') settings: Settings;
  @Input('enableBattle') enableBattle: boolean;
  @Output('attritionReport') attritionReport: EventEmitter<any>;
  public unitA: Unit;
  public unitB: Unit;

  constructor(private modalService: NgbModal) {
    this.attritionReport = new EventEmitter<any>();
  }

  public open(content: any): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  public startBattle(): void {
    this.modalService.dismissAll();
    if (this.settings.law === 'lanchester') {
      var attrition = this.lanchesterLaw(this.unitA, this.unitB);
    } else if (this.settings.law === 'osipov') {
      var attrition = this.osipovLaw(this.unitA, this.unitB);
    } else if (this.settings.law === 'custom') {
      var attrition = this.customLaw(this.unitA, this.unitB);
    }
    this.attritionReport.emit(attrition);
  }

  public lanchesterLaw(a: Unit, b: Unit): any {
    let attritionA = this.lanchesterAttrition(b, a);
    let attritionB = this.lanchesterAttrition(a, b);
    return {'a': attritionA, 'b': attritionB};
  }

  public osipovLaw(a: Unit, b: Unit): any {
    let attritionA = this.osipovAttrition(b, a);
    let attritionB = this.osipovAttrition(a, b);
    return {'a': attritionA, 'b': attritionB};
  }

  public customLaw(a: Unit, b: Unit): any {
    let customAttrition = new Function('attacker', 'attacked', this.settings.implementation);
    let attritionA = customAttrition(b, a);
    let attritionB = customAttrition(a, b);
    return {'a': attritionA, 'b': attritionB};
  }

  public lanchesterAttrition(attacker: Unit, attacked: Unit): number {
    let attrition = attacker.size * attacker.power;
    if (attrition > attacked.size) {
      attrition = attacked.size;
    }
    return attrition;
  }

  public osipovAttrition(attacker: Unit, attacked: Unit): number {
    var probability = (attacker.power * attacker.size) / attacked.size;
    var attrition = 0;
    var i = 1;
    while(i <= attacked.size) {
      if (probability >= random.float(0, 1)) {
        attrition++
      }
      i++
    }
    if (attrition > attacked.size) {
      attrition = attacked.size;
    }
    return attrition;
}

}
