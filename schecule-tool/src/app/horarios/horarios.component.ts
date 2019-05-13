import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';

export interface horario {
  horas: string
  lunes: string
  martes: string
  miercoles: string
  jueves: string
  viernes: string
}

export interface grupos {
  nombreGrupo: string
  grupo: horario[]
}

export interface cursos {
  cursoN: string
  grupos: grupos[]
}

export interface grados {
  grado: string
  gradoCode: string
  curso: cursos[]
}

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {
  public gradoSel: grados
  public cursoSel: cursos
  public gruposJSON;
  public gruposPrimero = ['GM11', 'GM12', 'GM13', 'GM14', 'GM15', 'GT11', 'GT12', 'GT13']
  public gruposSegundo = ['GM21', 'GM22', 'GM23', 'GT21', 'GT22']
  public asignaturasPrimero = ['FS', 'A', 'ED', 'AS', 'FI', 'EC']
  public asignaturasSegundo = ['E', 'FE', 'FIS', 'PCA', 'SI']
  public diasSemanaShort = ['L', 'M', 'X', 'J', 'V']
  public diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']

  checkHora(horas: [], i: number, gt: boolean) {
    var flag: boolean = false
    gt ? i += 14 : i += 9
    for (let hora in horas) if (horas[hora] == i) flag = true
    return flag
  }

  checkGrupo(grupo: String, i, curso: String) {
    var flag: boolean = false
    if (curso === 'primero') if (this.gruposPrimero[i] == this.primero[this.primero.indexOf(this.primero.find(primero => primero.nombreGrupo === grupo))].nombreGrupo) flag = true
    if (curso === 'segundo') if (this.gruposSegundo[i] == this.segundo[this.segundo.indexOf(this.segundo.find(segundo => segundo.nombreGrupo === grupo))].nombreGrupo) flag = true
    return flag
  }

  getJson() {
    return this.http.get('http://localhost:3000/json').subscribe(data => {
      console.log(data)
      this.gruposJSON = data;
      for (let grupo in this.gruposPrimero) {
        var aux
        this.gruposPrimero[grupo].charAt(1) === 'T' ? aux = 1 : aux = 0
        for (let asig in this.asignaturasPrimero) {
          for (let dias in this.diasSemanaShort) {
            for (let i = aux; i < 7; i++) {
              if (data[this.gruposPrimero[grupo]][this.asignaturasPrimero[asig]][this.diasSemanaShort[dias]] != undefined) {
                if (this.diasSemanaShort[dias] == 'L' && this.checkHora(data[this.gruposPrimero[grupo]][this.asignaturasPrimero[asig]][this.diasSemanaShort[dias]], i, this.gruposPrimero[grupo].charAt(1) === 'T') && this.checkGrupo(this.gruposPrimero[grupo], grupo, 'primero')) this.primero[grupo].grupo[i].lunes = this.asignaturasPrimero[asig]
                if (this.diasSemanaShort[dias] == 'M' && this.checkHora(data[this.gruposPrimero[grupo]][this.asignaturasPrimero[asig]][this.diasSemanaShort[dias]], i, this.gruposPrimero[grupo].charAt(1) === 'T') && this.checkGrupo(this.gruposPrimero[grupo], grupo, 'primero')) this.primero[grupo].grupo[i].martes = this.asignaturasPrimero[asig]
                if (this.diasSemanaShort[dias] == 'X' && this.checkHora(data[this.gruposPrimero[grupo]][this.asignaturasPrimero[asig]][this.diasSemanaShort[dias]], i, this.gruposPrimero[grupo].charAt(1) === 'T') && this.checkGrupo(this.gruposPrimero[grupo], grupo, 'primero')) this.primero[grupo].grupo[i].miercoles = this.asignaturasPrimero[asig]
                if (this.diasSemanaShort[dias] == 'J' && this.checkHora(data[this.gruposPrimero[grupo]][this.asignaturasPrimero[asig]][this.diasSemanaShort[dias]], i, this.gruposPrimero[grupo].charAt(1) === 'T') && this.checkGrupo(this.gruposPrimero[grupo], grupo, 'primero')) this.primero[grupo].grupo[i].jueves = this.asignaturasPrimero[asig]
                if (this.diasSemanaShort[dias] == 'V' && this.checkHora(data[this.gruposPrimero[grupo]][this.asignaturasPrimero[asig]][this.diasSemanaShort[dias]], i, this.gruposPrimero[grupo].charAt(1) === 'T') && this.checkGrupo(this.gruposPrimero[grupo], grupo, 'primero')) this.primero[grupo].grupo[i].viernes = this.asignaturasPrimero[asig]
              }

            }

          }
        }
      }
      for (let grupo in this.gruposSegundo) {
        for (let asig in this.asignaturasSegundo) {
          for (let dias in this.diasSemanaShort) {
            for (let i = 0; i < 7; i++) {
              if (data[this.gruposSegundo[grupo]][this.asignaturasSegundo[asig]][this.diasSemanaShort[dias]] != undefined) {
                if (this.diasSemanaShort[dias] == 'L' && this.checkHora(data[this.gruposSegundo[grupo]][this.asignaturasSegundo[asig]][this.diasSemanaShort[dias]], i, this.gruposSegundo[grupo].charAt(1) === 'T') && this.checkGrupo(this.gruposSegundo[grupo], grupo, 'segundo')) this.segundo[grupo].grupo[i].lunes = this.asignaturasSegundo[asig]
                if (this.diasSemanaShort[dias] == 'M' && this.checkHora(data[this.gruposSegundo[grupo]][this.asignaturasSegundo[asig]][this.diasSemanaShort[dias]], i, this.gruposSegundo[grupo].charAt(1) === 'T') && this.checkGrupo(this.gruposSegundo[grupo], grupo, 'segundo')) this.segundo[grupo].grupo[i].martes = this.asignaturasSegundo[asig]
                if (this.diasSemanaShort[dias] == 'X' && this.checkHora(data[this.gruposSegundo[grupo]][this.asignaturasSegundo[asig]][this.diasSemanaShort[dias]], i, this.gruposSegundo[grupo].charAt(1) === 'T') && this.checkGrupo(this.gruposSegundo[grupo], grupo, 'segundo')) this.segundo[grupo].grupo[i].miercoles = this.asignaturasSegundo[asig]
                if (this.diasSemanaShort[dias] == 'J' && this.checkHora(data[this.gruposSegundo[grupo]][this.asignaturasSegundo[asig]][this.diasSemanaShort[dias]], i, this.gruposSegundo[grupo].charAt(1) === 'T') && this.checkGrupo(this.gruposSegundo[grupo], grupo, 'segundo')) this.segundo[grupo].grupo[i].jueves = this.asignaturasSegundo[asig]
                if (this.diasSemanaShort[dias] == 'V' && this.checkHora(data[this.gruposSegundo[grupo]][this.asignaturasSegundo[asig]][this.diasSemanaShort[dias]], i, this.gruposSegundo[grupo].charAt(1) === 'T') && this.checkGrupo(this.gruposSegundo[grupo], grupo, 'segundo')) this.segundo[grupo].grupo[i].viernes = this.asignaturasSegundo[asig]
              }

            }

          }
        }
      }

    });
  }

  constructor(private http: HttpClient) {

  }

  GM11: horario[] = [
    { horas: '09-10', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '10-11', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '11-12', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '12-13', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '13-14', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '14-15', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '15-21', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' }
  ]
  GM12: horario[] = [
    { horas: '09-10', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '10-11', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '11-12', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '12-13', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '13-14', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '14-15', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '15-21', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' }
  ]
  GM13: horario[] = [
    { horas: '09-10', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '10-11', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '11-12', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '12-13', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '13-14', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '14-15', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '15-21', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' }
  ]
  GM14: horario[] = [
    { horas: '09-10', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '10-11', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '11-12', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '12-13', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '13-14', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '14-15', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '15-21', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' }
  ]
  GM15: horario[] = [
    { horas: '09-10', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '10-11', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '11-12', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '12-13', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '13-14', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '14-15', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '15-21', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' }
  ]
  GT11: horario[] = [
    { horas: '09-15', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '15-16', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '16-17', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '17-18', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '18-19', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '19-20', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '20-21', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' }
  ]
  GT12: horario[] = [
    { horas: '09-15', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '15-16', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '16-17', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '17-18', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '18-19', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '19-20', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '20-21', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' }
  ]
  GT13: horario[] = [
    { horas: '09-15', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '15-16', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '16-17', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '17-18', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '18-19', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '19-20', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' },
    { horas: '20-21', lunes: '', martes: '', miercoles: '', jueves: '', viernes: '' }
  ]


  GM21: horario[] = [
    { horas: "09-10", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "10-11", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "11-12", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "12-13", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "13-14", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "14-15", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "15-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
  ]

  GM22: horario[] = [
    { horas: "09-10", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "10-11", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "11-12", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "12-13", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "13-14", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "14-15", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "15-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
  ]

  GM23: horario[] = [
    { horas: "09-10", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "10-11", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "11-12", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "12-13", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "13-14", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "14-15", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "15-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
  ]

  GT21: horario[] = [
    { horas: "09-15", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "15-16", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "16-17", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "17-18", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "18-19", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "19-20", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "20-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
  ]

  GT22: horario[] = [
    { horas: "09-15", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "15-16", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "16-17", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "17-18", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "18-19", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "19-20", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "20-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
  ]

  GCOM31: horario[] = [
    { horas: "09-10", lunes: '', martes: "AA", miercoles: 'TL', jueves: '', viernes: '' },
    { horas: "10-11", lunes: '', martes: "AA", miercoles: 'TL', jueves: '', viernes: '' },
    { horas: "11-12", lunes: '', martes: "SSR", miercoles: 'SSR', jueves: 'AA', viernes: 'TL' },
    { horas: "12-13", lunes: '', martes: "SSR", miercoles: 'SSR', jueves: 'AA', viernes: 'TL' },
    { horas: "13-14", lunes: '', martes: "PHW", miercoles: '', jueves: 'PHW', viernes: '' },
    { horas: "14-15", lunes: '', martes: "PHW", miercoles: '', jueves: 'PHW', viernes: '' },
    { horas: "15-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
  ]

  GIWM31: horario[] = [
    { horas: "09-10", lunes: '', martes: "", miercoles: 'BDA', jueves: 'ADS', viernes: 'BDA' },
    { horas: "10-11", lunes: '', martes: "", miercoles: 'BDA', jueves: 'ADS', viernes: 'BDA' },
    { horas: "11-12", lunes: '', martes: "TL", miercoles: 'EM', jueves: 'TL', viernes: 'EM' },
    { horas: "12-13", lunes: '', martes: "TL", miercoles: 'EM', jueves: 'TL', viernes: 'EM' },
    { horas: "13-14", lunes: '', martes: "CDI", miercoles: 'ADS', jueves: 'CDI', viernes: '' },
    { horas: "14-15", lunes: '', martes: "CDI", miercoles: 'ADS', jueves: 'CDI', viernes: '' },
    { horas: "15-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
  ]

  GIWT31: horario[] = [
    { horas: "09-15", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "15-16", lunes: '', martes: "CDI", miercoles: 'EM', jueves: 'EM', viernes: 'ADS' },
    { horas: "16-17", lunes: '', martes: "CDI", miercoles: 'EM', jueves: 'EM', viernes: 'ADS' },
    { horas: "17-18", lunes: '', martes: "ADS", miercoles: 'TL', jueves: 'CDI', viernes: 'TL' },
    { horas: "18-19", lunes: '', martes: "ADS", miercoles: 'TL', jueves: 'CDI', viernes: 'TL' },
    { horas: "19-20", lunes: '', martes: "BDA", miercoles: '', jueves: 'BDA', viernes: '' },
    { horas: "20-21", lunes: '', martes: "BDA", miercoles: '', jueves: 'BDA', viernes: '' }
  ]

  GSIT31: horario[] = [
    { horas: "09-15", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "15-16", lunes: '', martes: "MP", miercoles: 'PO', jueves: 'MP', viernes: 'SIG' },
    { horas: "16-17", lunes: '', martes: "MP", miercoles: 'PO', jueves: 'MP', viernes: 'SIG' },
    { horas: "17-18", lunes: '', martes: "MD", miercoles: 'TL', jueves: 'MD', viernes: 'TL' },
    { horas: "18-19", lunes: '', martes: "MD", miercoles: 'TL', jueves: 'MD', viernes: 'TL' },
    { horas: "19-20", lunes: '', martes: "BDA", miercoles: '', jueves: 'BDA', viernes: '' },
    { horas: "20-21", lunes: '', martes: "BDA", miercoles: '', jueves: 'BDA', viernes: '' }
  ]

  GTIM31: horario[] = [
    { horas: "09-10", lunes: '', martes: "", miercoles: 'TL', jueves: 'CU', viernes: 'CU' },
    { horas: "10-11", lunes: '', martes: "", miercoles: 'TL', jueves: 'CU', viernes: 'CU' },
    { horas: "11-12", lunes: '', martes: "SSR", miercoles: 'SSR', jueves: '', viernes: 'TL' },
    { horas: "12-13", lunes: '', martes: "SSR", miercoles: 'SSR', jueves: '', viernes: 'TL' },
    { horas: "13-14", lunes: '', martes: "", miercoles: 'RA', jueves: '', viernes: 'RA' },
    { horas: "14-15", lunes: '', martes: "", miercoles: 'RA', jueves: '', viernes: 'RA' },
    { horas: "15-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
  ]

  GMOPT41: horario[] = [
    { horas: "09-10", lunes: '', martes: "", miercoles: '', jueves: 'MTS', viernes: 'MTS' },
    { horas: "10-11", lunes: '', martes: "", miercoles: '', jueves: 'MTS', viernes: 'MTS' },
    { horas: "11-12", lunes: '', martes: "EPAC", miercoles: 'TDW', jueves: 'EPAC', viernes: 'TDW' },
    { horas: "12-13", lunes: '', martes: "EPAC", miercoles: 'TDW', jueves: 'EPAC', viernes: 'TDW' },
    { horas: "13-14", lunes: '', martes: "", miercoles: 'INM', jueves: '', viernes: '' },
    { horas: "14-15", lunes: '', martes: "", miercoles: 'INM', jueves: '', viernes: '' },
    { horas: "15-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
  ]

  GMOPT41a: horario[] = [
    { horas: "09-10", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "10-11", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "11-12", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "12-13", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "13-14", lunes: '', martes: "", miercoles: 'INA', jueves: '', viernes: '' },
    { horas: "14-15", lunes: '', martes: "", miercoles: 'INA', jueves: '', viernes: '' },
    { horas: "15-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
  ]
  GMOPT41b: horario[] = [
    { horas: "09-10", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "10-11", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "11-12", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "12-13", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "13-14", lunes: '', martes: "", miercoles: 'TCI', jueves: '', viernes: '' },
    { horas: "14-15", lunes: '', martes: "", miercoles: 'TCI', jueves: '', viernes: '' },
    { horas: "15-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
  ]

  GTOPT41: horario[] = [
    { horas: "09-15", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "15-16", lunes: '', martes: "AI", miercoles: 'DV', jueves: 'EPAC', viernes: 'DV' },
    { horas: "16-17", lunes: '', martes: "AI", miercoles: 'DV', jueves: 'EPAC', viernes: 'DV' },
    { horas: "17-18", lunes: '', martes: "EPAC", miercoles: 'SIA', jueves: 'AI', viernes: 'SIA' },
    { horas: "18-19", lunes: '', martes: "EPAC", miercoles: 'SIA', jueves: 'AI', viernes: 'SIA' },
    { horas: "19-20", lunes: '', martes: "GPS", miercoles: '', jueves: '', viernes: '' },
    { horas: "20-21", lunes: '', martes: "GPS", miercoles: '', jueves: '', viernes: '' }
  ]
  GTOPT42: horario[] = [
    { horas: "09-15", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "15-16", lunes: '', martes: "", miercoles: '', jueves: 'EPAC', viernes: '' },
    { horas: "16-17", lunes: '', martes: "", miercoles: '', jueves: 'EPAC', viernes: '' },
    { horas: "17-18", lunes: '', martes: "EPAC", miercoles: '', jueves: '', viernes: '' },
    { horas: "18-19", lunes: '', martes: "EPAC", miercoles: '', jueves: '', viernes: '' },
    { horas: "19-20", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "20-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
  ]

  primero: grupos[] = [
    { nombreGrupo: "GM11", grupo: this.GM11 },
    { nombreGrupo: "GM12", grupo: this.GM12 },
    { nombreGrupo: "GM13", grupo: this.GM13 },
    { nombreGrupo: "GM14", grupo: this.GM14 },
    { nombreGrupo: "GM15", grupo: this.GM15 },
    { nombreGrupo: "GT11", grupo: this.GT11 },
    { nombreGrupo: "GT12", grupo: this.GT12 },
    { nombreGrupo: "GT13", grupo: this.GT13 }
  ]

  segundo: grupos[] = [
    { nombreGrupo: "GM21", grupo: this.GM21 },
    { nombreGrupo: "GM22", grupo: this.GM22 },
    { nombreGrupo: "GM23", grupo: this.GM23 },
    { nombreGrupo: "GT21", grupo: this.GT21 },
    { nombreGrupo: "GT22", grupo: this.GT22 }
  ]

  terceroComputadores: grupos[] = [
    { nombreGrupo: "GCOM31", grupo: this.GCOM31 }
  ]

  terceroSoftware: grupos[] = [
    { nombreGrupo: "GIWM31", grupo: this.GIWM31 },
    { nombreGrupo: "GIWT31", grupo: this.GIWT31 }
  ]

  terceroSI: grupos[] = [
    { nombreGrupo: "GSIT31", grupo: this.GSIT31 }
  ]

  terceroTSI: grupos[] = [
    { nombreGrupo: "GTIM31", grupo: this.GTIM31 }
  ]

  cuarto: grupos[] = [
    { nombreGrupo: "GMOPT41", grupo: this.GMOPT41 },
    { nombreGrupo: "GMOPT41a", grupo: this.GMOPT41a },
    { nombreGrupo: "GMOPT41b", grupo: this.GMOPT41b },
    { nombreGrupo: "GTOPT41", grupo: this.GTOPT41 },
    { nombreGrupo: "GTOPT42", grupo: this.GTOPT42 }
  ]

  computadores: cursos[] = [
    { cursoN: "primero", grupos: this.primero },
    { cursoN: "segundo", grupos: this.segundo },
    { cursoN: "tercero", grupos: this.terceroComputadores },
    { cursoN: "cuarto", grupos: this.cuarto },
  ]

  software: cursos[] = [
    { cursoN: "primero", grupos: this.primero },
    { cursoN: "segundo", grupos: this.segundo },
    { cursoN: "tercero", grupos: this.terceroSoftware },
    { cursoN: "cuarto", grupos: this.cuarto },
  ]

  sistInformacion: cursos[] = [
    { cursoN: "primero", grupos: this.primero },
    { cursoN: "segundo", grupos: this.segundo },
    { cursoN: "tercero", grupos: this.terceroSI },
    { cursoN: "cuarto", grupos: this.cuarto },
  ]

  tecSocInformacion: cursos[] = [
    { cursoN: "primero", grupos: this.primero },
    { cursoN: "segundo", grupos: this.segundo },
    { cursoN: "tercero", grupos: this.terceroTSI },
    { cursoN: "cuarto", grupos: this.cuarto },
  ]

  grados: grados[] = [
    { grado: "Computadores", gradoCode: "comp", curso: this.computadores },
    { grado: "Software", gradoCode: "soft", curso: this.software },
    { grado: "Sist. Información", gradoCode: "si", curso: this.sistInformacion },
    { grado: "Tec. para la Sociedad de la Información", gradoCode: "tsi", curso: this.tecSocInformacion }
  ]


  ngOnInit() {
    this.getJson()
  }

  public setGradoFromMatrix(grado) {
    $('#' + grado.gradoCode).click()
  }

  public setCursoFromMatrix(curso) {
    $('#' + curso.cursoN).click()
  }

  public setGrado(grado) {
    if (this.cursoSel != null) $('#' + this.cursoSel.cursoN + '.btn-pantone285-active').removeClass('btn-pantone285-active').addClass('btn-pantone285')
    if (this.gradoSel != null) $('#' + this.gradoSel.gradoCode + '.btn-pantone285-active').removeClass('btn-pantone285-active').addClass('btn-pantone285')
    this.gradoSel = null
    console.log(grado.gradoCode)
    $('#' + grado.gradoCode).addClass('btn-pantone285-active')
    $('#' + grado.gradoCode).removeClass('btn-pantone285')
    console.log("gradoo: " + grado.grado)
    this.gradoSel = grado
    this.cursoSel = null
  }

  public setCurso(curso) {
    if (this.cursoSel != null) $('#' + this.cursoSel.cursoN + '.btn-pantone285-active').removeClass('btn-pantone285-active').addClass('btn-pantone285')
    this.cursoSel = curso
    $('#' + curso.cursoN).addClass('btn-pantone285-active')
    $('#' + curso.cursoN).removeClass('btn-pantone285')
    console.log("cs: " + this.cursoSel.cursoN)
  }

  getGradoPos() {
    return this.grados.indexOf(this.gradoSel)
  }

  getCursoPos() {
    return this.grados[this.grados.indexOf(this.gradoSel)].curso.indexOf(this.cursoSel)
  }

  displayedColumns: string[] = ['horas', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes'];

}
