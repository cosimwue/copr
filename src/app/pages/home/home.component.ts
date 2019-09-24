import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { Settings, Army } from '../../models';

import { KatexOptions } from 'ng-katex';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public settings: Settings;
  public equationA: string;
  public equationB: string;
  public preParagraph: string;
  public postParagraph: string;
  public options: KatexOptions;

  constructor(private router: Router) { }

  public startGame(): void {
    let settings: NavigationExtras = {
      state: this.settings
    };
    this.router.navigate(['/game'], settings);
  }

  public ngOnInit(): void {
    let armyA = new Army('England', 1000, 0.2, 0.1);
    let armyB = new Army('France', 1000, 0.1, 0.2);
    let law = 'lanchester';
    let implementation = '// Write only the function\'s body and return an integer\n\nreturn attacker.power * attacker.size;';
    this.settings = new Settings(armyA, armyB, law, implementation);
    this.options = { displayMode: true };
    this.equationA = '\\frac{dA}{dt} = -\\beta B';
    this.equationB = '\\frac{dB}{dt} = -\\alpha A';
    this.preParagraph = `
    For example, Lanchester’s square law calculates the number of soldiers lost using two simple equations, where 
    $A$ represents the number of soldiers with firepower $\\alpha$ in the one force, and $B$ with 
    $\\beta$ in the other.
    `;
    this.postParagraph = `
    $\\frac{dA}{dt}$ or $\\frac{dB}{dt}$ represents the rate at which the number 
    of soldiers is changing at a particular instant. A negative value indicates the loss of soldiers.
    `;
  }

}