import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { Settings, Army } from '../../models';

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

  public ngOnInit() {
    let armyA = new Army('England', 1000);
    let armyB = new Army('France', 1000);
    let law = 'lanchester';
    let implementation = 'battle(attacker: Unit, attacked: Unit): void {\n    // Write your code in this block, for example:\n    attacked.size = attacked.size - attacker.force;\n}';
    this.settings = new Settings(armyA, armyB, law, implementation);
  }

}
