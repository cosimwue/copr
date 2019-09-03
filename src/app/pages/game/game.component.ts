import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Settings, Army } from '../../models';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public enableBattle: boolean;
  public settings: Settings;
  public status: any;

  constructor(private router: Router, private toastr: ToastrService) {
    const navigation = this.router.getCurrentNavigation();
    let settings = navigation.extras.state;
    /*this.settings = new Settings(
      settings.armyA,
      settings.armyB,
      settings.law,
      settings.implementation,
      settings.timePerBattle
    );*/
    let armyA = new Army('England', 1000, 0.5, 0.5);
    let armyB = new Army('France', 1000, 0.5, 0.5);
    let law = 'lanchester';
    let implementation = 'TODO';
    let timePerBattle = 120;
    this.settings = new Settings(armyA, armyB, law, implementation, timePerBattle);
  }


  private gameOver(winner: Army): void {
    let heading = 'War is over!';
    let message = `${winner.name} has won a total of ${winner.wins} battles and has thus also won the war.`;
    this.toastr.success(message, heading, {disableTimeOut: true, positionClass: 'toast-bottom-center'});
  }


  public ngOnInit(): void {
    this.enableBattle = true;
    this.status = {'one': {'a': 0, 'b': 0}, 'two': {'a': 0, 'b': 0}, 'three': {'a': 0, 'b': 0}}
  }

}
