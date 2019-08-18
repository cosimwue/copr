import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { ElectronService } from './providers/electron.service';
import { WebviewDirective } from './directives/webview.directive';
import { AppComponent } from './app.component';
import { InfoComponent } from './components';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CountdownModule } from 'ngx-countdown';

import { HomeComponent } from './pages/home/home.component';
import { GameComponent } from './pages/game/game.component';
import { UnitStatsComponent } from './components/unit-stats/unit-stats.component';


@NgModule({
  declarations: [
    AppComponent,
    WebviewDirective,
    InfoComponent,
    HomeComponent,
    GameComponent,
    UnitStatsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    CountdownModule
  ],
  providers: [ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule { }
