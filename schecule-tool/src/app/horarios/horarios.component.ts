import { Component, OnInit } from '@angular/core';

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
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  displayedColumns: string[] = ['horas', 'lunes', 'martes', 'miercoles','jueves','viernes'];
  dataSource = Datos;
}
