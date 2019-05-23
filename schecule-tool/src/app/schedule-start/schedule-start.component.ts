import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {SubjectModel} from '../subject-model';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import * as jsPDF from 'jspdf';
import { strictEqual } from 'assert';
import { stringify } from '@angular/core/src/util';
import { HorariosService } from '../horarios/horarios.service';
import * as $ from 'jquery';
import { ScheduleStartService } from './schedule-start.service';
import { async } from '@angular/core/testing';
import { debug } from 'util';

@Component({
  selector: 'app-schedule-start',
  templateUrl: './schedule-start.component.html',
  styleUrls: ['./schedule-start.component.css'],
  providers: [ScheduleStartComponent]
})

export class ScheduleStartComponent implements OnInit {
  

  @ViewChild('tabla') tabla: ElementRef;

  primeroSelected=false;



  constructor(iconRegistry: MatIconRegistry, sanitizer:DomSanitizer, private http: HttpClient, private horariosService: HorariosService, public scheduleStartService: ScheduleStartService) { 
    iconRegistry.addSvgIcon(
      'deleteicon',
      sanitizer.bypassSecurityTrustResourceUrl('/src/app/schedule-start/deleteicon.svg'));
  }
  
  public grupos = {};

  mobileGrades = [
    'Software',
    'Computadores',
    'Sistemas de Información',
    'Tecnologías de Soc de Inf',
    //'Software y Tec Soc Inf',
    //'Computadores y Tec Soc Inf'
  ];

  courses= [];
  dias = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
  ];
  inicialDias = ["L", "M", "X", "J", "V"];
  horas = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];  
  cursos;
  grades;
  mobile = false;
  chargeCheckboxes = false;
  gradeName = 'Elige Grado';
  courseName = 'Elige Curso';
  actualCourse = [];
  actualGrade;
  actualSubjects = [];



  reset() {
    this.gradeName = 'Elige Grado';
    this.courseName = 'Elige Curso';
    this.scheduleStartService.cargarMatriz();
    this.chargeCheckboxes = false;
  }

  changeGradeName(name) {
    if (name != 'Elige Grado') {
      //this.actualGrade = this.grades[this.grades.indexOf(name)];
      this.gradeName = name;
      this.courses = this.scheduleStartService.cargarCursos(name);
      if(!this.courses.includes(this.courseName)){
        this.courseName = this.courses[0];
      }
        this.changeCourseName(this.courseName);
        console.log(name.slice(0,3))
        this.horariosService.setGradoFromMatrix(name)
        console.log("Paquetocas")
    }
  }

  changeCourseName(name) {
    this.scheduleStartService.actualSubjects = [];
    this.courseName = name;
    if (this.gradeName != 'Elige Grado' && name != 'Elige Curso') {
      this.chargeCheckboxes = true;
     this.scheduleStartService.actualCourse = this.actualGrade[this.courses.indexOf(name)];
     console.log(name + " " + this.courses.indexOf(name))
     this.scheduleStartService.cargarGrupos(this.gradeName, this.courseName);
     this.scheduleStartService.obtainActualSubjects();
      this.scheduleStartService.cargarMatrizBotones();
      this.scheduleStartService.checkDesignedSchedule();
      this.horariosService.setCursoFromMatrix(name.toLowerCase())
      if(name!="Elige Curso" ) $('table.table').addClass('up-table')
      else $('table.table').removeClass('up-table')     
    }
  }

  async ngOnInit() {

    var size = $( window ).width();
    console.log("SIZE: "+size)
    if (size < 500){
      $('#botones-matriz').addClass('btn-group-vertical');
      $('#botones-matriz').removeClass('btn-group');
    }else{
      $('#botones-matriz').removeClass('btn-group-vertical');
      $('#botones-matriz').addClass('btn-group');
    }

    this.mobile = this.scheduleStartService.detectMob();
    await this.scheduleStartService.getJsonConnection();
    await this.scheduleStartService.getJson();
    this.grades = this.scheduleStartService.cargarGrados();
    this.courses = this.scheduleStartService.cargarCursos(this.grades[0]);

    //this.scheduleStartService.cargarCursos("Software", 1)

    //console.log("Cursos:")
   // console.log(this.cursos);
    this.scheduleStartService.cargarMatriz();
    this.scheduleStartService.actualSubjects  =[];
    this.scheduleStartService.actualCourse = [];
  }

}