import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule,NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScheduleStartComponent } from './schedule-start/schedule-start.component';
import { ScheduleMonthlyComponent } from './schedule-monthly/schedule-monthly.component';

@NgModule({
  declarations: [
    AppComponent,
    ScheduleStartComponent,
    ScheduleMonthlyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    NgbPaginationModule,
    NgbAlertModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
