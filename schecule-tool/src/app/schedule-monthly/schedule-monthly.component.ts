import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-schedule-monthly',
  templateUrl: './schedule-monthly.component.html',
  styleUrls: ['./schedule-monthly.component.css']
})
export class ScheduleMonthlyComponent implements OnInit {

  calendarPlugins= [dayGridPlugin]
  
  constructor() { }

  ngOnInit() {
  }

}
