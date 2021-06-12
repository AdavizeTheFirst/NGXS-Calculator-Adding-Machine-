import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ScreenComponent } from './screen/screen.component';
import { KeypadComponent } from './keypad/keypad.component';
import { NgxsModule } from '@ngxs/store';
import { CalculatorState } from './state/calculator.state';
import { NgxsReduxDevtoolsPlugin, NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPlugin, NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { HistoryComponent } from './history/history.component';


@NgModule({
  declarations: [
    AppComponent,
    ScreenComponent,
    KeypadComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([
      CalculatorState
    ]),

    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
