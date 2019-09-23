import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { ElectronService } from './providers/electron.service';
import { WebviewDirective } from './directives/webview.directive';
import { AppComponent } from './app.component';
import { InfoComponent, BattleComponent, BattlefieldComponent } from './components';
import { HomeComponent, GameComponent } from './pages';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { KatexModule } from 'ng-katex';
import { ResultComponent } from './pages/result/result.component';


@NgModule({
  declarations: [
    AppComponent,
    WebviewDirective,
    InfoComponent,
    HomeComponent,
    GameComponent,
    BattleComponent,
    BattlefieldComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    KatexModule
  ],
  providers: [ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule { }
