import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { Settings, Unit } from '../../models';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public settings: Settings;

  constructor(private router: Router) { }

  public startGame(): void {
    let settings: NavigationExtras = {
      state: {
        settings: this.settings
      }};
    this.router.navigate([`/game`], settings);
  }

  ngOnInit() {
    this.settings = new Settings();
  }

}
