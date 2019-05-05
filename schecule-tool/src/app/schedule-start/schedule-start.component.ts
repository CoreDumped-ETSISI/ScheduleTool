import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';

import {SubjectModel} from '../subject-model';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import * as jsPDF from 'jspdf';
import { strictEqual } from 'assert';
import { stringify } from '@angular/core/src/util';
import { HorariosComponent } from '../horarios/horarios.component';
@Component({
  selector: 'app-schedule-start',
  templateUrl: './schedule-start.component.html',
  styleUrls: ['./schedule-start.component.css']
})

export class ScheduleStartComponent implements OnInit {
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
  
  constructor(iconRegistry: MatIconRegistry, sanitizer:DomSanitizer, private http: HttpClient, private horariosComponent: HorariosComponent) { 
    iconRegistry.addSvgIcon(
      'deleteicon',
      sanitizer.bypassSecurityTrustResourceUrl('/src/app/schedule-start/deleteicon.svg'));
  }

  @ViewChild('tabla') tabla: ElementRef;

  downloadPDF(){
    let doc = new jsPDF('p', 'pt', 'letter');
    let tabla = this.tabla.nativeElement;
    let specialElementHandlers = {
      '#editor': function(element, renderer){
        return true;
      } 
    };

    doc.fromHTML(tabla.innerHTML, 80, 15, {
      'width': 210,
      'elementHandlers': specialElementHandlers,
    });

    doc.save('horarios.pdf');
  }

  public grupos;

  getJson(){
    return this.http.get('http://localhost:3000/json').subscribe(data => {
      var groupString = '';
      groupString = data[0].file;      
      this.grupos = JSON.parse(groupString);
      console.log(this.grupos)
    });  
  }

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
  gruposJson = { "GCOM31":
  { "AA": {"J":[11,12],"M":[9,10]},
    "PHW": {"J":[13,14],"M":[13,14]},
    "SSR": {"M":[11,12],"X":[11,12]},
    "TL": {"V":[11,12],"X":[9,10]}},
 "GIWM31":
  { "ADS": {"J":[9,10],"X":[13,14]},
    "TL": {"J":[11,12],"M":[11,12]},
    "CDI": {"J":[13,14],"M":[13,14]},
    "BDA": {"V":[9,10],"X":[9,10]},
    "EM": {"V":[11,12],"X":[11,12]}},
 "GIWT31":
  { "EM": {"J":[15,16],"X":[15,16]},
    "CDI": {"J":[17,18],"M":[15,16]},
   "BDA": {"J":[19,20],"M":[19,20]},
    "ADS": {"M":[17,18],"V":[15,16]},
    "TL": {"V":[17,18],"X":[17,18]}},
 "GM11":
  { "FS": {"J":[9,10]},
    "A": {"J":[11,12],"M":[11,12],"V":[13]},
    "ED": {"M":[9,10],"X":[13,14]},
    "AS": {"M":[13,14]},
    "FI": {"V":[9,10],"X":[9,10]},
    "EC": {"V":[11,12],"X":[11,12]}},
 "GM12":
  { "FI": {"J":[9,10],"M":[9,10]},
    "EC": {"J":[11,12],"M":[11,12]},
    "ED": {"J":[13,14],"X":[9,10]},
    "A": {"M":[13],"V":[11,12],"X":[13,14]},
    "FS": {"V":[9,10]},
    "AS": {"X":[11,12]}},
 "GM13":
  { "A": {"J":[9,10],"M":[9,10],"X":[13]},
    "ED": {"J":[11,12],"M":[11,12]},
    "FS": {"J":[13,14]},
    "EC": {"V":[9,10],"X":[9,10]},
    "AS": {"V":[11,12]},
    "FI": {"V":[13,14],"X":[11,12]}},
 "GM14":
  { "EC": {"J":[9,10],"M":[13,14]},
    "FI": {"J":[11,12],"M":[11,12]},
    "A": {"J":[13],"V":[13,14],"X":[9,10]},
    "AS": {"M":[9,10]},
    "ED": {"V":[9,10],"X":[11,12]},
    "FS": {"V":[11,12]}},
 "GM15":
  { "ED": {"J":[9,10],"V":[9,10]},
    "FI": {"J":[11,12],"V":[11,12]},
    "A": {"J":[13],"M":[11,12],"X":[11,12]},
    "EC": {"M":[9,10],"X":[13,14]},
    "FS": {"V":[13,14]},
    "AS": {"X":[9,10]}},
 "GM21":
  { "FIS": {"J":[9,10],"M":[9,10],"X":[13,14]},
    "E": {"J":[11,12],"M":[11,12],"V":[13]},
    "SI": {"M":[13,14]},
    "FE": {"V":[9,10],"X":[9,10]},
    "PCA": {"V":[11,12],"X":[11,12]}},
 "GM22":
  { "FE": {"J":[9,10],"M":[9,10]},
    "PCA": {"J":[11,12],"M":[11,12]},
    "FIS": {"J":[13,14],"V":[9,10],"X":[9,10]},
    "E": {"M":[13],"V":[11,12],"X":[13,14]},
    "SI": {"X":[11,12]}},
 "GM23":
  { "E": {"J":[9,10],"M":[9,10],"X":[13]},
    "FIS": {"J":[11,12],"M":[11,12],"X":[11,12]},
    "FE": {"J":[13,14],"V":[13,14]},
    "PCA": {"V":[9,10],"X":[9,10]},
    "SI": {"V":[11,12]}},
 "GMOPT41":
  { "MTS": {"J":[9,10],"V":[9,10]},
    "INM": {"J":[10],"X":[13,14]},
    "EPAC": {"J":[11,12],"M":[11,12]},
    "TDW": {"V":[11,12],"X":[11,12]}},
 "GMOPT41a": { "INA": {"X":[13,14]}},
 "GMOPT41b": { "TCI": {"X":[13,14]}},
 "GSIT31":
  { "MP": {"J":[15,16],"M":[15,16]},
    "MD": {"J":[17,18],"M":[17,18]},
    "BDA": {"J":[19,20],"M":[19,20]},
    "SIG": {"V":[15,16]},
    "TL": {"V":[17,18],"X":[17,18]},
    "PO": {"X":[15,16]}},
 "GT11":
  { "A": {"J":[16],"V":[15,16],"X":[17,18]},
    "EC": {"J":[17,18],"M":[15,16]},
    "FI": {"J":[19,20],"M":[19,20]},
    "AS": {"M":[17,18]},
    "ED": {"V":[17,18],"X":[19,20]},
    "FS": {"V":[19,20]}},
 "GT12":
  { "ED": {"J":[15,16],"X":[17,18]},
    "FI": {"J":[17,18],"M":[17,18]},
    "EC": {"J":[19,20],"M":[19,20]},
    "A": {"M":[16],"V":[19,20],"X":[15,16]},
    "FS": {"V":[17,18]},
    "AS": {"X":[19,20]}},
 "GT13":
  { "FS": {"J":[15,16]},
    "A": {"J":[17,18],"M":[17,18],"X":[16]},
    "ED": {"J":[19,20],"M":[19,20]},
    "FI": {"V":[15,16],"X":[19,20]},
    "EC": {"V":[17,18],"X":[17,18]},
    "AS": {"V":[19,20]}},
 "GT21":
  { "PCA": {"J":[15,16],"M":[19,20]},
    "FIS": {"J":[17,18],"M":[17,18],"X":[15,16]},
    "E": {"J":[19],"V":[17,18],"X":[19,20]},
    "SI": {"M":[15,16]},
    "FE": {"V":[15,16],"X":[17,18]}},
 "GT22":
  { "FIS": {"J":[15,16],"M":[19,20],"V":[17,18]},
    "FE": {"J":[17,18],"M":[17,18]},
    "E": {"J":[19],"V":[15,16],"X":[15,16]},
    "PCA": {"M":[15,16],"X":[17,18]},
    "SI": {"X":[19,20]}},
 "GTIM31":
  { "CU": {"J":[9,10],"V":[9,10]},
    "SSR": {"M":[11,12],"X":[11,12]},
    "TL": {"V":[11,12],"X":[9,10]},
    "RA": {"V":[13,14],"X":[13,14]}},
 "GTOPT41":
  { "EPAC": {"J":[15,16],"M":[17,18]},
    "AI": {"J":[17,18],"M":[15,16]},
    "GPS": {"M":[19,20]},
    "DV": {"V":[15,16],"X":[15,16]},
    "SIA": {"V":[17,18],"X":[17,18]}},
 "GTOPT42": { "EPAC": {"J":[15,16],"M":[17,18]}} 
  };

  mobile = false;
  chargeCheckboxes = false;
  gradeName = 'Elige Grado';
  courseName = 'Elige Curso';
  actualCourse;
  actualGrade;
  actualSubjects;
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
    if (name != 'Elige Grado') {
      this.actualGrade = this.cursos[this.grades.indexOf(name)];
      this.gradeName = name;
      this.getAndUpdateGradoByName(name)
    }
  }

  changeCourseName(name) {
    if (this.gradeName != 'Elige Grado' && name != 'Elige Curso') {
      this.chargeCheckboxes = true;
      this.actualCourse = this.actualGrade[this.courses.indexOf(name)];
      this.actualSubjects = Object.keys(this.grupos[this.actualCourse[0]]);
      this.matrizBotones = null;
      this.cargarMatrizBotones();
      this.courseName = name;
      this.getAndUpdateCursoByName(name)
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
    console.log(this.matrizBotones);
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
          console.log("Metemos " + this.matrizHorario[hourPos][dayPos][this.matrizHorario[hourPos][dayPos].length - 1].nombre + ":" + this.matrizHorario[hourPos][dayPos][this.matrizHorario[hourPos][dayPos].length - 1].grupo );
        }else{
          console.log("Ya existe!");
        }
        this.matrizCoincidencias[hourPos][dayPos] = this.matrizHorario[hourPos][dayPos].length > 1;
      }  
    }
    console.log(this.matrizCoincidencias);
  }
  botonLimpiarAsignatura(asignatura:string, row:number){
    for(let col in this.matrizBotonesPulsados[row]){
      this.matrizBotonesPulsados[row][col] = false;
    }
    console.log("Limpiamos...");
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

  ngOnInit() {
    this.detectmob();
    this.cargarMatriz();
    //console.log(this.matrizHorario);
    this.getJson();
    console.log(this.grupos)
  }

}