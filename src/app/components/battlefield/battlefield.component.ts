import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.scss']
})
export class BattlefieldComponent implements OnInit, OnChanges{
  @Input('a') a: any;
  @Input('b') b: any;
  public widthA: number;
  public widthB: number;
  public aIsSet: boolean;
  public bIsSet: boolean;
  COOL: any;

  constructor() { }

  public ngOnInit(): void {
    this.widthA = 50;
    this.widthB = 50;
    this.aIsSet = false;
    this.bIsSet = false;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    let total = changes.a.currentValue.size + changes.b.currentValue.size
    let a = (changes.a.currentValue.size / total) * 100;
    let b = (changes.b.currentValue.size / total) * 100;
    this.COOL = total
    if (!(a + b == 100)) {
      this.widthA = 50;
      this.widthB = 50;
      this.aIsSet = false;
      this.bIsSet = false;
    } else {
      this.widthA = a;
      this.widthB = b;
      this.aIsSet = true;
      this.bIsSet = true;
    }
  }

}
