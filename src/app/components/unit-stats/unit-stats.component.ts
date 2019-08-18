import { Component, OnInit, Input } from '@angular/core';
import { Unit } from '../../models';

@Component({
  selector: 'app-unit-stats',
  templateUrl: './unit-stats.component.html',
  styleUrls: ['./unit-stats.component.scss']
})
export class UnitStatsComponent {
  @Input('unit') unit: Unit;

  constructor() { }

}
