import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleStartComponent } from './schedule-start/schedule-start.component';
import { ScheduleMonthlyComponent } from './schedule-monthly/schedule-monthly.component';

const routes: Routes = [
  {path: '', component: ScheduleStartComponent },
  {path: 'mensual', component: ScheduleMonthlyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
