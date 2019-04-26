import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleMonthlyComponent } from './schedule-monthly/schedule-monthly.component';

const routes: Routes = [
  {path: 'mensual', component: ScheduleMonthlyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
