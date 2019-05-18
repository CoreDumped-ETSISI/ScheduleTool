import { Injectable, NgModule } from '@angular/core';
import { horario, grupos, grados, cursos } from './horario.interface'
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';

@Injectable({
  providedIn: 'root',
})

@NgModule({
  imports: [MatTableModule]
})
export class HorariosService {

  constructor(private http: HttpClient) { }

  public gradoSel: grados
  public cursoSel: cursos
  public gruposJSON;
  public gruposPrimero = ['GM11', 'GM12', 'GM13', 'GM14', 'GM15', 'GT11', 'GT12', 'GT13']
  public gruposSegundo = ['GM21', 'GM22', 'GM23', 'GT21', 'GT22']
  public gruposTercerosCom = ['GCOM31']
  public gruposTercerosSoft = ['GIWM31', 'GIWT31']
  public gruposTerceroSI = ['GSIT31']
  public gruposTerceroTI = ['GTIM31']
  public gruposCuarto = ['GMOPT41', 'GMOPT41a', 'GMOPT41b', 'GTOPT41', 'GTOPT42']
  public gradosCodes = ['comp', 'soft', 'si', 'tsi']
  public cursos = ['primero', 'segundo', 'tercero', 'cuarto']
  public asignaturasPrimero = ['FS', 'A', 'ED', 'AS', 'FI', 'EC']
  public asignaturasSegundo = ['E', 'FE', 'FIS', 'PCA', 'SI']
  public asignaturasTerceroCompu = ['AA', 'PHW', 'SSR', 'TL']
  public asignaturasTerceroSoft = ['ADS', 'BDA', 'CDI', 'EM']
  public asignaturasTerceroSI = ['BDA', 'MD', 'MP', 'PO', 'SIG', 'TL']
  public asignaturasTerceroTI = ['CU', 'RA', 'SSR', 'TL']
  public asignaturasCuarto = ["EPAC", "AI", "GPS", "DV", "SIA", "MTS", "INM", "TDW", "INA", "TCI"]
  public diasSemanaShort = ['L', 'M', 'X', 'J', 'V']
  public diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']


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
    { horas: "09-10", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "10-11", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "11-12", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "12-13", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "13-14", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "14-15", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "15-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
  ]

  GIWM31: horario[] = [
    { horas: "09-10", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "10-11", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "11-12", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "12-13", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "13-14", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "14-15", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "15-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
  ]

  GIWT31: horario[] = [
    { horas: "09-15", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "15-16", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "16-17", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "17-18", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "18-19", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "19-20", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "20-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
  ]

  GSIT31: horario[] = [
    { horas: "09-15", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "15-16", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "16-17", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "17-18", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "18-19", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "19-20", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "20-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
  ]

  GTIM31: horario[] = [
    { horas: "09-10", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "10-11", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "11-12", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "12-13", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "13-14", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "14-15", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "15-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
  ]

  GMOPT41: horario[] = [
    { horas: "09-10", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "10-11", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "11-12", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "12-13", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "13-14", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "14-15", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "15-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
  ]

  GMOPT41a: horario[] = [
    { horas: "09-10", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "10-11", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "12-13", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "11-12", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "13-14", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "14-15", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "15-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
  ]
  GMOPT41b: horario[] = [
    { horas: "09-10", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "10-11", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "11-12", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "12-13", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "13-14", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "14-15", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "15-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
  ]

  GTOPT41: horario[] = [
    { horas: "09-15", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "15-16", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "16-17", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "17-18", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "18-19", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "19-20", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "20-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
  ]
  GTOPT42: horario[] = [
    { horas: "09-15", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "15-16", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "16-17", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "17-18", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "18-19", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "19-20", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
    { horas: "20-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
  ]

  primero: grupos[] = [
    { nombreGrupo: "GM11", grupo: this.GM11, asignaturas: this.asignaturasPrimero },
    { nombreGrupo: "GM12", grupo: this.GM12, asignaturas: this.asignaturasPrimero },
    { nombreGrupo: "GM13", grupo: this.GM13, asignaturas: this.asignaturasPrimero },
    { nombreGrupo: "GM14", grupo: this.GM14, asignaturas: this.asignaturasPrimero },
    { nombreGrupo: "GM15", grupo: this.GM15, asignaturas: this.asignaturasPrimero },
    { nombreGrupo: "GT11", grupo: this.GT11, asignaturas: this.asignaturasPrimero },
    { nombreGrupo: "GT12", grupo: this.GT12, asignaturas: this.asignaturasPrimero },
    { nombreGrupo: "GT13", grupo: this.GT13, asignaturas: this.asignaturasPrimero }
  ]

  segundo: grupos[] = [
    { nombreGrupo: "GM21", grupo: this.GM21, asignaturas: this.asignaturasSegundo },
    { nombreGrupo: "GM22", grupo: this.GM22, asignaturas: this.asignaturasSegundo },
    { nombreGrupo: "GM23", grupo: this.GM23, asignaturas: this.asignaturasSegundo },
    { nombreGrupo: "GT21", grupo: this.GT21, asignaturas: this.asignaturasSegundo },
    { nombreGrupo: "GT22", grupo: this.GT22, asignaturas: this.asignaturasSegundo }
  ]

  terceroComputadores: grupos[] = [
    { nombreGrupo: "GCOM31", grupo: this.GCOM31, asignaturas: this.asignaturasTerceroCompu }
  ]

  terceroSoftware: grupos[] = [
    { nombreGrupo: "GIWM31", grupo: this.GIWM31, asignaturas: this.asignaturasTerceroSoft },
    { nombreGrupo: "GIWT31", grupo: this.GIWT31, asignaturas: this.asignaturasTerceroSoft }
  ]

  terceroSI: grupos[] = [
    { nombreGrupo: "GSIT31", grupo: this.GSIT31, asignaturas: this.asignaturasTerceroSI }
  ]

  terceroTSI: grupos[] = [
    { nombreGrupo: "GTIM31", grupo: this.GTIM31, asignaturas: this.asignaturasTerceroTI }
  ]

  cuarto: grupos[] = [
    { nombreGrupo: "GMOPT41", grupo: this.GMOPT41, asignaturas: this.asignaturasCuarto },
    { nombreGrupo: "GMOPT41a", grupo: this.GMOPT41a, asignaturas: this.asignaturasCuarto },
    { nombreGrupo: "GMOPT41b", grupo: this.GMOPT41b, asignaturas: this.asignaturasCuarto },
    { nombreGrupo: "GTOPT41", grupo: this.GTOPT41, asignaturas: this.asignaturasCuarto },
    { nombreGrupo: "GTOPT42", grupo: this.GTOPT42, asignaturas: this.asignaturasCuarto }
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

  checkHora(horas: [], i: number, gt: boolean) {
    var flag: boolean = false
    gt ? i += 14 : i += 9
    for (let hora in horas) if (horas[hora] == i) flag = true
    return flag
  }

  checkGrupo(grupo: String, i, curso: String, gcode: String) {
    var flag: boolean = false
    if (curso === 'primero') if (this.gruposPrimero[i] == this.primero[this.primero.indexOf(this.primero.find(primero => primero.nombreGrupo === grupo))].nombreGrupo) flag = true
    if (curso === 'segundo') if (this.gruposSegundo[i] == this.segundo[this.segundo.indexOf(this.segundo.find(segundo => segundo.nombreGrupo === grupo))].nombreGrupo) flag = true
    if (curso === 'tercero' && gcode === 'comp') if (this.gruposTercerosCom[i] == this.terceroComputadores[this.terceroComputadores.indexOf(this.terceroComputadores.find(terceroCompu => terceroCompu.nombreGrupo === grupo))].nombreGrupo) flag = true
    if (curso === 'tercero' && gcode === 'soft') if (this.gruposTercerosSoft[i] == this.terceroSoftware[this.terceroSoftware.indexOf(this.terceroSoftware.find(terceroSoft => terceroSoft.nombreGrupo === grupo))].nombreGrupo) flag = true
    if (curso === 'tercero' && gcode === 'si') if (this.gruposTerceroSI[i] == this.terceroSI[this.terceroSI.indexOf(this.terceroSI.find(terceroSI => terceroSI.nombreGrupo === grupo))].nombreGrupo) flag = true
    if (curso === 'tercero' && gcode === 'tsi') if (this.gruposTerceroTI[i] == this.terceroTSI[this.terceroTSI.indexOf(this.terceroTSI.find(terceroTSI => terceroTSI.nombreGrupo === grupo))].nombreGrupo) flag = true
    if (curso === 'cuarto') if (this.gruposCuarto[i] == this.cuarto[this.cuarto.indexOf(this.cuarto.find(cuarto => cuarto.nombreGrupo === grupo))].nombreGrupo) flag = true
    return flag
  }

  rellenarHorarios() {
    var data = this.gruposJSON
    var buscarAsignatura: boolean = false
    var aux
    var gt: boolean
    for (let grado in this.gradosCodes) {
      for (let curso in this.grados[grado].curso) {
        for (let grupo in this.grados[grado].curso[curso].grupos) {
          var grupoAux = this.grados[grado].curso[curso].grupos[grupo]
          if (this.grados[grado].curso[curso].cursoN == 'primero' || this.grados[grado].curso[curso].cursoN == 'segundo' || this.grados[grado].curso[curso].cursoN == 'cuarto') this.grados[grado].curso[curso].grupos[grupo].nombreGrupo.charAt(1) === 'T' ? aux = 1 : aux = 0
          if (this.grados[grado].curso[curso].cursoN == 'tercero') this.grados[grado].curso[curso].grupos[grupo].nombreGrupo.charAt(3) === 'T' ? aux = 1 : aux = 0
     
          aux == 1 ? gt = true : gt = false

          for (let i = aux; i < 7; i++) {
            for (let asig in grupoAux.asignaturas) {
              var asigAux
              if (this.grados[grado].curso[curso].grupos[grupo].asignaturas[asig] != undefined) {
                asigAux = this.grados[grado].curso[curso].grupos[grupo].asignaturas[asig]
                if (grupoAux.nombreGrupo == 'GMOPT41') {
                  if (['EPAC', 'TDW', 'INM', 'MTS'].includes(asigAux)) buscarAsignatura = true
                  else buscarAsignatura = false
                }
                if (grupoAux.nombreGrupo == 'GMOPT41a') {
                  if (['INA'].includes(asigAux)) buscarAsignatura = true
                  else buscarAsignatura = false
                }
                if (grupoAux.nombreGrupo == 'GMOPT41b') {
                  if (['TCI'].includes(asigAux)) buscarAsignatura = true
                  else buscarAsignatura = false
                }
                if (grupoAux.nombreGrupo == 'GTOPT41') {
                  if (['EPAC', 'AI', 'GPS', 'SIA', 'DV'].includes(asigAux)) buscarAsignatura = true
                  else buscarAsignatura = false
                }
                if (grupoAux.nombreGrupo == 'GTOPT42') {
                  if (['EPAC', 'AI', 'GPS', 'SIA', 'DV'].includes(asigAux)) buscarAsignatura = true
                  else buscarAsignatura = false
                }

                if (this.grados[grado].curso[curso].cursoN != 'cuarto') buscarAsignatura = true
                if (buscarAsignatura == true) {

                  try {
                    for (let dias in this.diasSemanaShort) {
                      var diasAux = this.diasSemanaShort[dias]
                      if (typeof data[grupoAux.nombreGrupo][asigAux][diasAux] !== undefined) {
                        if (this.diasSemanaShort[dias] == 'L' && this.checkHora(data[grupoAux.nombreGrupo][asigAux][diasAux], i, gt) && this.checkGrupo(grupoAux.nombreGrupo, grupo, this.grados[grado].curso[curso].cursoN.toLowerCase(), this.grados[grado].gradoCode)) this.grados[grado].curso[curso].grupos[grupo].grupo[i].lunes = this.grados[grado].curso[curso].grupos[grupo].asignaturas[asig]
                        if (this.diasSemanaShort[dias] == 'M' && this.checkHora(data[grupoAux.nombreGrupo][asigAux][diasAux], i, gt) && this.checkGrupo(grupoAux.nombreGrupo, grupo, this.grados[grado].curso[curso].cursoN.toLowerCase(), this.grados[grado].gradoCode)) this.grados[grado].curso[curso].grupos[grupo].grupo[i].martes = this.grados[grado].curso[curso].grupos[grupo].asignaturas[asig]
                        if (this.diasSemanaShort[dias] == 'X' && this.checkHora(data[grupoAux.nombreGrupo][asigAux][diasAux], i, gt) && this.checkGrupo(grupoAux.nombreGrupo, grupo, this.grados[grado].curso[curso].cursoN.toLowerCase(), this.grados[grado].gradoCode)) this.grados[grado].curso[curso].grupos[grupo].grupo[i].miercoles = this.grados[grado].curso[curso].grupos[grupo].asignaturas[asig]
                        if (this.diasSemanaShort[dias] == 'J' && this.checkHora(data[grupoAux.nombreGrupo][asigAux][diasAux], i, gt) && this.checkGrupo(grupoAux.nombreGrupo, grupo, this.grados[grado].curso[curso].cursoN.toLowerCase(), this.grados[grado].gradoCode)) this.grados[grado].curso[curso].grupos[grupo].grupo[i].jueves = this.grados[grado].curso[curso].grupos[grupo].asignaturas[asig]
                        if (this.diasSemanaShort[dias] == 'V' && this.checkHora(data[grupoAux.nombreGrupo][asigAux][diasAux], i, gt) && this.checkGrupo(grupoAux.nombreGrupo, grupo, this.grados[grado].curso[curso].cursoN.toLowerCase(), this.grados[grado].gradoCode)) this.grados[grado].curso[curso].grupos[grupo].grupo[i].viernes = this.grados[grado].curso[curso].grupos[grupo].asignaturas[asig]
                      }
                    }
                  } catch (error) {
                    console.log("Error: " + error)
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  getJson() {
    return this.http.get('http://localhost:3000/json').subscribe(data => {
      this.gruposJSON = data;
      this.rellenarHorarios()
      return 'horarios creados'
    });
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
    $('#' + grado.gradoCode).addClass('btn-pantone285-active')
    $('#' + grado.gradoCode).removeClass('btn-pantone285')
    this.gradoSel = grado
    this.cursoSel = null
  }

  public setCurso(curso) {
    if (this.cursoSel != null) $('#' + this.cursoSel.cursoN + '.btn-pantone285-active').removeClass('btn-pantone285-active').addClass('btn-pantone285')
    this.cursoSel = curso
    $('#' + curso.cursoN).addClass('btn-pantone285-active')
    $('#' + curso.cursoN).removeClass('btn-pantone285')
  }

  getGradoPos() {
    return this.grados.indexOf(this.gradoSel)
  }

  getCursoPos() {
    return this.grados[this.grados.indexOf(this.gradoSel)].curso.indexOf(this.cursoSel)
  }
}
