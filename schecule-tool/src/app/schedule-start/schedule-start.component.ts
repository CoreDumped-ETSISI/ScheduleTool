import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule-start',
  templateUrl: './schedule-start.component.html',
  styleUrls: ['./schedule-start.component.css']
})
export class ScheduleStartComponent implements OnInit {

  mobile = false;

  grades = [
    'Software',
    'Computadores',
    'Sistemas de Información',
    'Tecnologías de Sociedades de Información',
    'Software y Tecnologías de Sociedades de Información',
    'Computadores y Tecnologías de Sociedades de Información'
  ];

  mobileGrades = [
    'Software',
    'Computadores',
    'Sistemas de Información',
    'Tecnologías de Soc de Inf',
    'Software y Tec Soc Inf',
    'Computadores y Tec Soc Inf'
  ];

  courses = [
    'Primero',
    'Segundo',
    'Tercero',
    'Cuarto'
  ];

  subjectName = 'Elige Grado';
  courseName = 'Elige Curso';

  constructor() { }

  ngOnInit() {
    console.log("yay");
    this.detectmob();
  }

  ngOnChanges(){
      
  }

  changeGradeName(name) {
    console.log('epicidad');
    this.subjectName = name;
  }

  changeCourseName(name) {
    this.courseName = name;
  }

  detectmob() { 
    if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    ){
      this.mobile = true;
    }
    else {
      this.mobile = false;
    }
  };

}
