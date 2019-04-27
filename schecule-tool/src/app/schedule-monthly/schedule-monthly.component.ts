import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarService } from '../../calendar.service';
import events from '../../json/eventos.json'
import exams from '../../json/examenes.json'

@Component({
  selector: 'app-schedule-monthly',
  templateUrl: './schedule-monthly.component.html',
  styleUrls: ['./schedule-monthly.component.css']
})
export class ScheduleMonthlyComponent implements OnInit {

  calendarEvents: any[]=[];

  calendarPlugins= [dayGridPlugin]
  
  constructor(private service: CalendarService) { }

  //Cargar eventos recogidos en service getDate
  ngOnInit() {
    this.calendarEvents = exams.concat(events)
    //this.service.getEventos().subscribe(data => this.calendarEvents = data);
  }

}
