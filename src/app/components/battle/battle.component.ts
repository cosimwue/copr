import { Component, Input } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Settings } from '../../models';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent {
  @Input('settings') settings: Settings;
  public countdownConfig: any = {'leftTime': 120, 'template': '$!m!:$!s!'};

  constructor(private modalService: NgbModal) { }

  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

}
