import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { Settings, Army } from '../../models';

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public settings: Settings;

  constructor(private router: Router, private toastr: ToastrService) { }

  public startGame(): void {
    let settings: NavigationExtras = {
      state: this.settings
    };
    this.router.navigate(['/game'], settings);
  }

  public ngOnInit(): void {
    this.toastr.clear();
    let armyA = new Army('England', 1000);
    let armyB = new Army('France', 1000);
    let law = 'lanchester';
    let implementation = 'loss(attacker: Unit, attacked: Unit): number {\n  // The function returns the loss of the attacked unit\n  return attacker.size * attacker.power;\n}';
    let timePerBattle = 120;
    this.settings = new Settings(armyA, armyB, law, implementation, timePerBattle);
  }

}
