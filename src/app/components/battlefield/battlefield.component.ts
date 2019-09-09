import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.scss']
})
export class BattlefieldComponent implements OnChanges {
  @Input('a') a: any;
  @Input('b') b: any;

  constructor() { }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.a.currentValue.size)
  }
}
