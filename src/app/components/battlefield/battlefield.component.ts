import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.scss']
})
export class BattlefieldComponent implements OnInit{
  @Input('a') a: any;
  @Input('b') b: any;

  constructor() { }

  public ngOnInit() {
    
  }
}
