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
    let armyA = new Army('England', 1000, 0.5, 0.5);
    let armyB = new Army('France', 1000, 0.5, 0.5);
    let law = 'lanchester';
    let implementation = 'return attacker.size * attacker.power;';
    let timePerBattle = 120;
    this.settings = new Settings(armyA, armyB, law, implementation, timePerBattle);
  }

}
