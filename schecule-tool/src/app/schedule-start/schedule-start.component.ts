import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatRadioModule} from '@angular/material/radio'; 
import { HttpClient } from '@angular/common/http';

export interface horario {
  horas: string
  lunes: string
  martes: string
  miercoles: string
  jueves: string
  viernes: string
}

const Datos: horario[] = [
  { horas: "9-10", lunes: '', martes: "ED", miercoles: 'FI', jueves: 'FS', viernes: 'FI' },
  { horas: "10-11", lunes: '', martes: "ED", miercoles: 'FI', jueves: 'FS', viernes: 'FI' },
  { horas: "11-12", lunes: '', martes: "A", miercoles: 'EC', jueves: 'A', viernes: 'EC' },
  { horas: "12-13", lunes: '', martes: "A", miercoles: 'EC', jueves: 'A', viernes: 'EC' },
  { horas: "13-14", lunes: '', martes: "AS", miercoles: 'ED', jueves: '', viernes: 'A' },
  { horas: "14-15", lunes: '', martes: "AS", miercoles: 'ED', jueves: '', viernes: '' },
  { horas: "15-16", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "16-17", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "17-18", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "18-19", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "19-20", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "20-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
]

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

  constructor(private http: HttpClient) {
  }

  groupJson;

  getJson(){
    return this.http.get('http://localhost:3000/json').subscribe(data => {
      var groupString = '';
      groupString = data[0].file;      
      this.groupJson = JSON.parse(groupString);
      console.log(this.groupJson)
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
  inicialDias = ["L","M", "X", "J", "V"];
  horas = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  auxCurso1 = ['GM11', 'GM12', 'GM13', 'GM14', 'GM15', 'GT11', 'GT12', 'GT13'];//Como los 2 primeros anos son comunes a todos los grados y tienen las mismas clases, 
  auxCurso2 = ['GM21', 'GM22', 'GM23', 'GT21', 'GT22'];//generamos esta estructura auxiliar para no repetir codigo.
   cursos = [//HAY QUE REVISAR ESTOS ARRAYS, LOS NOMBRES DE LOS GRUPOS DE 3º Y 4º ESTAN DISTINTOS EN EL JSON Y NO LOS ENCUENTRA CUANDO LLAMANMOS A cargarAsignatura().
	[this.auxCurso1, this.auxCurso2, ['GSIM31', 'GSWT31', 'GMOPT', 'GTOPT 1', 'GTOPT 2'], ['GSWM41', 'GSWT41', 'GMOPT', 'GTOPT 1', 'GTOPT 2']],//Software
	[this.auxCurso1, this.auxCurso2,['GCOM31', 'GMOPT', 'GTOPT 1', 'GTOPT 2'],['GCOT41', 'GMOPT', 'GTOPT 1', 'GTOPT 2']],//Computadores
	[this.auxCurso1, this.auxCurso2, ['GSIT31', 'GMOPT', 'GTOPT 1', 'GTOPT 2'], ['GSIM41', 'GMOPT', 'GTOPT 1', 'GTOPT 2']],//Sist. Informacion
	[this.auxCurso1, this.auxCurso2, ['GTIM31', 'GMOPT', 'GTOPT 1', 'GTOPT 2'], ['GMOPT41a', 'GMOPT41b', 'GMOPT41', 'GTOPT41', 'GTOPT42']],//Tech. Sociedad Inform.
]
  grupos = { "GCOM31":
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
  public matrizHorario:string[][];
  public matrizCoincidencias:boolean[][];
  public matrizBotones;


  cargarMatriz(){
    this.matrizHorario = [];
    this.matrizCoincidencias = [];
    for(var i: number = 0; i < 11; i++) {
      this.matrizHorario[i] = [];
      this.matrizCoincidencias[i] = [];
      for(var j: number = 0; j< 5; j++) {
          this.matrizHorario[i][j] = "";
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
    if(name != 'Elige Grado'){
      this.actualGrade = this.cursos[this.grades.indexOf(name)];
      this.gradeName = name;
    }
  }

  changeCourseName(name) {
    if(this.gradeName != 'Elige Grado' && name != 'Elige Curso'){
      this.chargeCheckboxes = true;
      this.actualCourse = this.actualGrade[this.courses.indexOf(name)];
      this.actualSubjects = Object.keys(this.grupos[this.actualCourse[0]]);
      this.matrizBotones = null;
      this.cargarMatrizBotones();
      this.courseName = name;
    }
  }
  cargarMatrizBotones(){
    this.matrizBotones = [];
    for(var i:number = 0; i < this.actualSubjects.length; i++){
      this.matrizBotones[i] = [];
      for(var j:number = 0; j < this.actualCourse.length;j++){
        this.matrizBotones[i][j] = j;
      }
    }
    console.log(this.matrizBotones);
  }
  cargarAsignatura(asignatura:string, grupo:string){

    let clases = this.grupos[grupo][asignatura];
    let dayNames = Object.keys(clases);
    for(let day in clases){
      for(let hour in clases[day]){
        //console.log("Guardamos: " + asignatura + " en " + "[" + (-9 + clases[day][hour]) +"]" + "[" + this.inicialDias.indexOf(day) + "]");
        let hourPos = clases[day][hour] - 9;
        let dayPos = this.inicialDias.indexOf(day);
        this.matrizCoincidencias[hourPos][dayPos] = this.matrizHorario[hourPos][dayPos] != "";
        this.matrizHorario[hourPos][dayPos] +=  asignatura + "(" + grupo +")\n";


      }
    }
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

  }

  displayedColumns: string[] = ['horas', 'lunes', 'martes', 'miercoles','jueves','viernes'];
  dataSource = Datos;
}
