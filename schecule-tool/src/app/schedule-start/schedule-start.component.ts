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
import { HorariosComponent } from '../horarios/horarios.component';
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

  grades = [
    'Software',
    'Computadores',
    'Sistemas de Información',
    'Tecnologías de Sociedades de Información',
    //'Software y Tecnologías de Sociedades de Información',
    //'Computadores y Tecnologías de Sociedades de Información'
  ];

  checkGradoName(gradoName) {
    if (gradoName === "Sistemas de Información") return 'Sist. Información'
    if (gradoName === "Tecnologías de Sociedades de Información") return 'Tec. para la Sociedad de la Información'
    return gradoName
  }
  getAndUpdateGradoByName(gradoName) {
    gradoName = this.checkGradoName(gradoName)
    this.horariosComponent.setGradoFromMatrix(this.horariosComponent.grados[this.horariosComponent.grados.map((el) => el.grado).indexOf(gradoName)])
  }

  getAndUpdateCursoByName(cursoName) {
    cursoName = cursoName.toLowerCase()
    if(cursoName===undefined) cursoName = 'primero'    
    let grado = this.horariosComponent.grados[this.horariosComponent.grados.map((el) => el.grado).indexOf(this.checkGradoName(this.gradeName))]
    let curso = grado.curso[grado.curso.map((el) => el.cursoN).indexOf(this.checkGradoName(cursoName))]
    this.horariosComponent.setCursoFromMatrix(curso)
  }
  
  constructor(iconRegistry: MatIconRegistry, sanitizer:DomSanitizer, private http: HttpClient, private horariosComponent: HorariosComponent, public scheduleStartService: ScheduleStartService) { 
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

  courses = [
    'Primero',
    'Segundo',
    'Tercero',
    'Cuarto'
  ];
  dias = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
  ];
  inicialDias = ["L", "M", "X", "J", "V"];
  horas = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  auxCurso1 = ['GM11', 'GM12', 'GM13', 'GM14', 'GM15', 'GT11', 'GT12', 'GT13'];//Como los 2 primeros anos son comunes a todos los grados y tienen las mismas clases, 
  auxCurso2 = ['GM21', 'GM22', 'GM23', 'GT21', 'GT22'];//generamos esta estructura auxiliar para no repetir codigo.
  auxCurso4 = ['GMOPT41', 'GMOPT41a', 'GMOPT41b', 'GTOPT41', 'GTOPT42'];
   cursos = [//HAY QUE REVISAR ESTOS ARRAYS, LOS NOMBRES DE LOS GRUPOS DE 3º Y 4º ESTAN DISTINTOS EN EL JSON Y NO LOS ENCUENTRA CUANDO LLAMANMOS A cargarAsignatura().
	[this.auxCurso1, this.auxCurso2, ['GIWM31', 'GIWT31'], this.auxCurso4],//Software
	[this.auxCurso1, this.auxCurso2,['GCOM31'],this.auxCurso4],//Computadores
	[this.auxCurso1, this.auxCurso2, ['GIWM31', 'GIWT31', 'GTIM31'], this.auxCurso4],//Sist. Informacion
	[this.auxCurso1, this.auxCurso2, ['GTIM31'], this.auxCurso4],//Tech. Sociedad Inform.
]
  
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
      this.actualGrade = this.cursos[this.grades.indexOf(name)];
      this.gradeName = name;
      this.changeCourseName(this.courseName);
      this.getAndUpdateGradoByName(name)
    }
  }

  changeCourseName(name) {
    this.scheduleStartService.actualSubjects = [];
    this.courseName = name;
    if (this.gradeName != 'Elige Grado' && name != 'Elige Curso') {
      this.chargeCheckboxes = true;
      this.scheduleStartService.actualCourse = this.actualGrade[this.courses.indexOf(name)];
      this.scheduleStartService.obtainActualSubjects();
      this.scheduleStartService.cargarMatrizBotones();
      this.scheduleStartService.checkDesignedSchedule();
      this.getAndUpdateCursoByName(name)
      if(name=="Primero" || name=="Segundo" || name=="Tercero" || name == "Cuarto" ) $('table.table').addClass('up-table')
      else $('table.table').removeClass('up-table')
      
    }
  }
  
  async ngOnInit() {
    this.mobile = this.scheduleStartService.detectMob();
  }

}