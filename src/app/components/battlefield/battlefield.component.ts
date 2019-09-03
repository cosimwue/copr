import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.scss']
})
export class BattlefieldComponent implements OnInit {
  @Input('a') a: number;
  @Input('b') b: number;
  public middle: number;

  constructor() { }

  ngOnInit() {
    if (this.a == 0 && this.b == 0) {
      this.middle = 100 - 30
    }
  }

}
