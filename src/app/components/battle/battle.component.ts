import { Component, Input, Output, EventEmitter } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Settings, Unit } from '../../models';

import { random } from 'random';


@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent {
  @Input('settings') settings: Settings;
  @Input('enableBattle') enableBattle: boolean;
  @Output('attritionReport') attritionReport: EventEmitter<any>;
  public availableA: number;
  public availableB: number;

  constructor(private modalService: NgbModal) {
    this.attritionReport = new EventEmitter<any>();
  }

  public open(content: any): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.availableA = this.settings.armyA.size;
    this.availableB = this.settings.armyB.size;
  }

  public startBattle(): void {
    this.modalService.dismissAll();
    if (this.settings.law === 'lanchester') {
      var attrition = this.lanchesterLaw(this.settings);
    } else if (this.settings.law === 'osipov') {
      var attrition = this.osipovLaw(this.settings);
    } else if (this.settings.law === 'custom') {
      var attrition = this.customLaw(this.settings);
    }
    this.attritionReport.emit(attrition);
  }

  public lanchesterLaw(settings: Settings): any {
    return {
      'b1': this.lanchesterAttrition(settings.armyA.firstUnit, settings.armyB.firstUnit),
      'a1': this.lanchesterAttrition(settings.armyB.firstUnit, settings.armyA.firstUnit),
      'b2': this.lanchesterAttrition(settings.armyA.secondUnit, settings.armyB.secondUnit),
      'a2': this.lanchesterAttrition(settings.armyB.secondUnit, settings.armyA.secondUnit),
      'b3': this.lanchesterAttrition(settings.armyA.thirdUnit, settings.armyB.thirdUnit),
      'a3': this.lanchesterAttrition(settings.armyB.thirdUnit, settings.armyA.thirdUnit),
    };
  }

  public osipovLaw(settings: Settings): any {
    return {
      'b1': this.osipovAttrition(settings.armyA.firstUnit, settings.armyB.firstUnit),
      'a1': this.osipovAttrition(settings.armyB.firstUnit, settings.armyA.firstUnit),
      'b2': this.osipovAttrition(settings.armyA.secondUnit, settings.armyB.secondUnit),
      'a2': this.osipovAttrition(settings.armyB.secondUnit, settings.armyA.secondUnit),
      'b3': this.osipovAttrition(settings.armyA.thirdUnit, settings.armyB.thirdUnit),
      'a3': this.osipovAttrition(settings.armyB.thirdUnit, settings.armyA.thirdUnit),
    };
  }

  public customLaw(settings: Settings): any {
    let customAttrition = new Function('attacker', 'attacked', this.settings.implementation);
    return {
      'b1': customAttrition(settings.armyA.firstUnit, settings.armyB.firstUnit),
      'a1': customAttrition(settings.armyB.firstUnit, settings.armyA.firstUnit),
      'b2': customAttrition(settings.armyA.secondUnit, settings.armyB.secondUnit),
      'a2': customAttrition(settings.armyB.secondUnit, settings.armyA.secondUnit),
      'b3': customAttrition(settings.armyA.thirdUnit, settings.armyB.thirdUnit),
      'a3': customAttrition(settings.armyB.thirdUnit, settings.armyA.thirdUnit),
    };
  }

  public lanchesterAttrition(attacker: Unit, attacked: Unit): number {
    if (attacker.combat) {
      var attrition = attacker.size * attacker.combatPower;
    } else {
      var attrition = attacker.size * attacker.defencePower;
    }
    if (attrition > attacked.size) {
      attrition = attacked.size;
    }
    return Math.round(attrition);
  }

  public osipovAttrition(attacker: Unit, attacked: Unit): number {
    if (attacker.combat) {
      var probability = (attacker.combatPower * attacker.size) / attacked.size;
    } else {
      var probability = (attacker.defencePower * attacker.size) / attacked.size;
    }
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
    return Math.round(attrition);
  }

}
