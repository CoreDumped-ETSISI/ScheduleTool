import { Injectable, NgModule } from '@angular/core';
import { horario, grupos, grados, cursos } from './horario.interface'
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { NetworkConstants } from '../network/network-constants'

@Injectable({
  providedIn: 'root',
})

@NgModule({
  imports: [MatTableModule]
})
export class HorariosService {

  constructor(private http: HttpClient, private networkConstants: NetworkConstants) { }

  gruposJSON
  gradoSel: string
  cursoSel: string
  organizationJSON
  gradosJSON
  grados = []
  cursos = []
  grupos = []
  asignaturas = []
  diasShort = ['L', 'M', 'X', 'J', 'V']

  gruposStruct = []
  grupoStruct: horario[] = []

  async getJson() {
    var result;
    this.http.get(this.getJSONURL()).subscribe(data => {
      result = data;
    });
    await this.delay(1000);
    this.gradosJSON = result["GRUPOS"];
    this.organizationJSON = result["ORGANIZACION"];
    this.setGrados()
    return result;
  }

  getJSONURL() {
    return this.networkConstants.getJSONEndpoint('json')
  }

  // Rellena un array con todos los grados
  setGrados() {
    this.cursos = []
    if (this.cursos.length == 0) {
      for (let grados in this.organizationJSON) {
        this.grados.push(grados)
      }
    }
  }

  // Rellena un array con todos los cursos que contiene un grado seleccionado
  setCursos() {
    for (let curso in this.organizationJSON[this.gradoSel]) {
      this.cursos.push(this.stringifyCurso(curso))
    }
  }

  // Rellena un array con todos los grupos de un curso en un grado
  setGrupos() {
    this.grupos = this.organizationJSON[this.gradoSel][this.unStringifyCurso(this.cursoSel)]
    this.setAsignaturas()
  }

  // Devuelve true si el grupo es de tarde
  checkTarde(grupo: string): boolean {
    if (this.cursoSel != 'tercero' && this.cursoSel != undefined) {
      return grupo.charAt(1) === 'T' ? true : false
    } else if (this.cursoSel === 'tercero') {
      return grupo.charAt(3) === 'T' ? true : false
    }
  }

  setAsignaturas() {
    this.gruposStruct = []
    for (let grupo in this.grupos) {
      this.grupoStruct = []
      let gt = this.checkTarde(this.grupos[grupo])
      let resta: number = gt ? 15 : 9
      this.setHoras(this.grupos[grupo], gt)

      for (let asignatura in this.gradosJSON[this.grupos[grupo]]) {
        Object.keys(this.gradosJSON[this.grupos[grupo]][asignatura]).forEach(day => {
          switch (day) {
            case 'L':
              for (let hora in this.gradosJSON[this.grupos[grupo]][asignatura][day]) {
                this.grupoStruct[this.gradosJSON[this.grupos[grupo]][asignatura][day][hora] - resta].lunes = asignatura
              }
              break;
            case 'M':
              for (let hora in this.gradosJSON[this.grupos[grupo]][asignatura][day]) {
                this.grupoStruct[this.gradosJSON[this.grupos[grupo]][asignatura][day][hora] - resta].martes = asignatura
              }
              break;
            case 'X':
              for (let hora in this.gradosJSON[this.grupos[grupo]][asignatura][day]) {
                this.grupoStruct[this.gradosJSON[this.grupos[grupo]][asignatura][day][hora] - resta].miercoles = asignatura
              }
              break;
            case 'J':
              for (let hora in this.gradosJSON[this.grupos[grupo]][asignatura][day]) {
                this.grupoStruct[this.gradosJSON[this.grupos[grupo]][asignatura][day][hora] - resta].jueves = asignatura
              }
              break;
            case 'V':
              for (let hora in this.gradosJSON[this.grupos[grupo]][asignatura][day]) {
                this.grupoStruct[this.gradosJSON[this.grupos[grupo]][asignatura][day][hora] - resta].viernes = asignatura
              }
              break;
            default:
              break;
          }
        })
      }
      this.gruposStruct.push(this.grupoStruct)
    }
  }

  // Establece las horas en formato HH:MM en funcion de si el grupo es de tarde o de mañana
  setHoras(grupo, gt) {
    this.grupoStruct = []
    let sum: number = gt ? 15 : 9
    for (let i = 0; i < 6; i++) {
      this.grupoStruct.push({ horas: "", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' })
      let h = i + sum
      this.grupoStruct[i].horas = h < 10 ? "0" + h + ":00" : h + ":00"
    }
  }

  // Transforma el valor numerico de un curso a una string (ejemplo '1' ==> 'primero')
  stringifyCurso(curso): string {
    let nCurso: string
    switch (curso) {
      case "1":
        nCurso = 'primero'
        break;
      case "2":
        nCurso = 'segundo'
        break;
      case "3":
        nCurso = 'tercero'
        break;
      case "4":
        nCurso = 'cuarto'
        break;
    }
    return nCurso
  }

  // Transforma el string de un curso a un valor numerico (en string) (ejemplo 'primero' ==> '1')
  unStringifyCurso(nCurso): string {
    let curso: string
    switch (nCurso) {
      case "primero":
        curso = '1'
        break;
      case "segundo":
        curso = '2'
        break;
      case "tercero":
        curso = '3'
        break;
      case "cuarto":
        curso = '4'
        break;
    }
    return curso
  }

  public setGradoFromMatrix(grado) {
    $('#' + grado.slice(0,3)).click()
  }

  public setCursoFromMatrix(curso) {
    $('#' + curso).click()
  }

  public setGrado(grado) {
    this.cursos = []
    if (this.cursoSel != null) $('#' + this.cursoSel + '.btn-pantone285-active').removeClass('btn-pantone285-active').addClass('btn-pantone285')
    if (this.gradoSel != null) $('#' + this.gradoSel.slice(0, 3) + '.btn-pantone285-active').removeClass('btn-pantone285-active').addClass('btn-pantone285')
    this.gradoSel = null
    $('#' + grado.slice(0, 3)).addClass('btn-pantone285-active')
    $('#' + grado.slice(0, 3)).removeClass('btn-pantone285')
    this.gradoSel = grado
    this.cursoSel = null
    this.setCursos()
    return (grado !== undefined && grado !== 'undefined') ? true : false
  }

  public setCurso(curso) {
    if (this.cursoSel != null) $('#' + this.cursoSel + '.btn-pantone285-active').removeClass('btn-pantone285-active').addClass('btn-pantone285')
    this.cursoSel = curso
    $('#' + curso).addClass('btn-pantone285-active')
    $('#' + curso).removeClass('btn-pantone285')
    this.setGrupos()
    return (curso !== undefined && curso !== 'undefined') ? true : false
  }

  getGradoPos() {
    //	return this.grados.indexOf(this.gradoSel)
  }

  getCursoPos() {
    //	return this.grados[this.grados.indexOf(this.gradoSel)].curso.indexOf(this.cursoSel)
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
