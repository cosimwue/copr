import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public displayRestart: boolean;

  constructor(private router: Router) {
    router.events.subscribe(_ => {
      this.displayRestart = this.router.url != '/';
    })
  }

}
