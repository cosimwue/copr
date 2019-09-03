import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { ElectronService } from './providers/electron.service';
import { WebviewDirective } from './directives/webview.directive';
import { AppComponent } from './app.component';
import { InfoComponent, BattleComponent } from './components';
import { HomeComponent, GameComponent } from './pages';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CountdownModule } from 'ngx-countdown';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { ToastrModule } from 'ngx-toastr';
import { BattlefieldComponent } from './components/battlefield/battlefield.component';


@NgModule({
  declarations: [
    AppComponent,
    WebviewDirective,
    InfoComponent,
    HomeComponent,
    GameComponent,
    BattleComponent,
    BattlefieldComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    CountdownModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule { }
