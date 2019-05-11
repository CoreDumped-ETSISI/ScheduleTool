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
  
  constructor(iconRegistry: MatIconRegistry, sanitizer:DomSanitizer, private http: HttpClient, private horariosComponent: HorariosComponent, private scheduleStartService: ScheduleStartService) { 
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
  public matrizHorario:SubjectModel[][][];
  public matrizCoincidencias:boolean[][];
  public matrizBotones;
  public matrizBotonesPulsados;

  cargarMatriz(){
    this.matrizHorario = [];
    this.matrizCoincidencias = [];
    for(var i: number = 0; i < 12; i++) {
      this.matrizHorario[i] = [];
      this.matrizCoincidencias[i] = [null];
      for(var j: number = 0; j< 5; j++) {
          this.matrizHorario[i][j] = [];
          this.matrizCoincidencias[i][j] = false;
      }
    }
  }

  reset() {
    this.gradeName = 'Elige Grado';
    this.courseName = 'Elige Curso';
    this.cargarMatriz();
    this.chargeCheckboxes = false;
  }

  changeGradeName(name) {
    console.log(this.tabla.nativeElement)
    if (name != 'Elige Grado') {
      this.actualGrade = this.cursos[this.grades.indexOf(name)];
      this.gradeName = name;
      this.changeCourseName(this.courseName);
      this.getAndUpdateGradoByName(name)
    }
  }

  changeCourseName(name) {
    this.actualSubjects=[];
    this.courseName = name;
    if (this.gradeName != 'Elige Grado' && name != 'Elige Curso') {
      this.chargeCheckboxes = true;
      this.actualCourse = this.actualGrade[this.courses.indexOf(name)];
      this.obtainActualSubjects();
      this.matrizBotones = null;
      this.cargarMatrizBotones();
      this.checkDesignedSchedule();
      this.getAndUpdateCursoByName(name)
      if(name=="Primero" || name=="Segundo" || name=="Tercero" || name == "Cuarto" ) $('table.table').addClass('up-table')
      else $('table.table').removeClass('up-table')
      
    }
  }
  cargarMatrizBotones() {
    this.matrizBotonesPulsados = [];
    this.matrizBotones = [];
    for (var i: number = 0; i < this.actualSubjects.length; i++) {
      this.matrizBotonesPulsados[i] = [];
      this.matrizBotones[i] = [];
      for (var j: number = 0; j < this.actualCourse.length; j++) {
        this.matrizBotones[i][j] = j;
        this.matrizBotonesPulsados[i][j] = false;
      }
    }
    //console.log(this.matrizBotones);
  }
  
  cargarAsignatura(asignatura:string, grupoStr:string, row:number, col:number){
    this.botonPulsado(row, col);
    let subject:SubjectModel = {
      nombre:asignatura,
      grupo:grupoStr
    };
    let clases = this.grupos[grupoStr][asignatura];
    let dayNames = Object.keys(clases);
    let finded = false;

    this.limpiarAsignatura(asignatura);

    for(let day in clases){
      for(let hour in clases[day]){
        //console.log("Guardamos: " + asignatura + " en " + "[" + (-9 + clases[day][hour]) +"]" + "[" + this.inicialDias.indexOf(day) + "]");
        let hourPos = clases[day][hour] - 9;
        let dayPos = this.inicialDias.indexOf(day);
        if(!this.matrizHorario[hourPos][dayPos].includes(subject)){ //HAY QUE PENSAR ESTO AGAIN.
          this.matrizHorario[hourPos][dayPos].push(subject);
          //console.log("Metemos " + this.matrizHorario[hourPos][dayPos][this.matrizHorario[hourPos][dayPos].length - 1].nombre + ":" + this.matrizHorario[hourPos][dayPos][this.matrizHorario[hourPos][dayPos].length - 1].grupo );
        }else{
          //console.log("Ya existe!");
        }
        this.matrizCoincidencias[hourPos][dayPos] = this.matrizHorario[hourPos][dayPos].length > 1;
      }  
    }
    //console.log(this.matrizCoincidencias);
  }
  botonLimpiarAsignatura(asignatura:string, row:number){
    console.log(this.tabla)
    for(let col in this.matrizBotonesPulsados[row]){
      this.matrizBotonesPulsados[row][col] = false;
    }
    //console.log("Limpiamos...");
    this.limpiarAsignatura(asignatura);
  }
  limpiarAsignatura(asignatura:string){
 
    for(let i in this.matrizHorario){
      for(let j in this.matrizHorario[i]){
        let counter = 0;
        for(let k in this.matrizHorario[i][j]){
          if(this.matrizHorario[i][j][k].nombre == asignatura){
            this.matrizHorario[i][j].splice(counter, 1);
          }
          counter++;
        }
        this.matrizCoincidencias[i][j] = this.matrizHorario[i][j].length > 1;

      }
    }
  }
  botonPulsado(row:number, col:number){
    for(let i in this.matrizBotonesPulsados[row]){
      this.matrizBotonesPulsados[row][i] = false;
    }
    this.matrizBotonesPulsados[row][col] = true;
  }
  obtainActualSubjects(){
    for(var group in this.actualCourse){
      Object.keys(this.grupos[this.actualCourse[group]]).forEach(subject => {
        if(!this.actualSubjects.includes(subject)){
          this.actualSubjects.push(subject);
        }
      });
    }
  }
  contieneLaAsignatura(subject:string, group:string){
    return Object.keys(this.grupos[group]).includes(subject);
  }
  checkDesignedSchedule(){
    for(let row in this.matrizHorario){
      for(let col in this.matrizHorario[row]){
        for(let asig in this.matrizHorario[row][col]){
          if(this.actualCourse.includes(this.matrizHorario[row][col][asig].grupo)){
            this.botonPulsado(this.actualSubjects.indexOf(this.matrizHorario[row][col][asig].nombre), this.actualCourse.indexOf(this.matrizHorario[row][col][asig].grupo));
          }
        }
      }
    }
  }
  
  async loadJson(){
    try{
      this.grupos = await this.scheduleStartService.getJson();
    }catch(error){
      console.log(error)
    }
  }

  async ngOnInit() {
    this.mobile = this.scheduleStartService.detectMob();
    this.cargarMatriz();
    this.loadJson();
    //console.log(this.matrizHorario);
    //console.log(this.grupos)  
  }

}