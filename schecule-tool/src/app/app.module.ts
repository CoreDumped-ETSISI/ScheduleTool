import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule,NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { AppRoutingModule } from './app-routing.module';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { ScheduleStartComponent } from './schedule-start/schedule-start.component';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTabsModule } from '@angular/material/tabs'
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion'
import { HorariosComponent } from './horarios/horarios.component'
import { ScheduleMonthlyComponent } from './schedule-monthly/schedule-monthly.component';
//Para el calendario 
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    AppComponent,
    ScheduleStartComponent,
    HorariosComponent,
    ScheduleMonthlyComponent
  ],
  imports: [
    HttpClientModule,
    MatIconModule,
    MatRadioModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatToolbarModule,
    MatTabsModule,
    MatCardModule,
    MatTableModule,
    MatExpansionModule,
    MatIconModule,
    MatCardModule,
    NgbPaginationModule,
    NgbAlertModule,
    FullCalendarModule,
  ],
  providers: [HorariosComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
