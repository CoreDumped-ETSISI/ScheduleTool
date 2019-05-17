import { Component, OnInit, Input } from '@angular/core';
import { HorariosService } from './horarios.service'
import { horario, grupos, grados, cursos } from './horario.interface'

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {

  constructor(public horariosService: HorariosService) {

  }

<<<<<<< HEAD
=======
  getJson() {
    return this.http.get('http://localhost:3000/json').subscribe(data => {
      console.log(data)
      this.gruposJSON = data;
      for (let grado in this.gradosCodes) {
        for (let curso in this.grados[grado].curso) {
          for (let grupo in this.grados[grado].curso[curso].grupos) {
            var grupoAux = this.grados[grado].curso[curso].grupos[grupo]
            var aux
            var gt: boolean
            if (this.grados[grado].curso[curso].cursoN == 'primero' || this.grados[grado].curso[curso].cursoN == 'segundo' || this.grados[grado].curso[curso].cursoN == 'cuarto') this.grados[grado].curso[curso].grupos[grupo].nombreGrupo.charAt(1) === 'T' ? aux = 1 : aux = 0
            if (this.grados[grado].curso[curso].cursoN == 'tercero') this.grados[grado].curso[curso].grupos[grupo].nombreGrupo.charAt(3) === 'T' ? aux = 1 : aux = 0
            aux == 1 ? gt = true : gt = false

            for (let i = aux; i < 7; i++) {
              for (let asig in grupoAux.asignaturas) {
                var asigAux
                if (this.grados[grado].curso[curso].grupos[grupo].asignaturas[asig] != undefined) {
                  asigAux = this.grados[grado].curso[curso].grupos[grupo].asignaturas[asig]

                  for (let dias in this.diasSemanaShort) {
                    var diasAux = this.diasSemanaShort[dias]
                    try {
                      if (data[this.grados[grado].curso[curso].grupos[grupo].nombreGrupo][this.grados[grado].curso[curso].grupos[grupo].asignaturas[asig]][diasAux] != undefined) {
                        if (this.diasSemanaShort[dias] == 'L' && this.checkHora(data[this.grados[grado].curso[curso].grupos[grupo].nombreGrupo][this.grados[grado].curso[curso].grupos[grupo].asignaturas[asig]][diasAux], i, gt) && this.checkGrupo(grupoAux.nombreGrupo, grupo, this.grados[grado].curso[curso].cursoN.toLowerCase(), this.grados[grado].gradoCode)) this.grados[grado].curso[curso].grupos[grupo].grupo[i].lunes = this.grados[grado].curso[curso].grupos[grupo].asignaturas[asig]
                        if (this.diasSemanaShort[dias] == 'M' && this.checkHora(data[this.grados[grado].curso[curso].grupos[grupo].nombreGrupo][this.grados[grado].curso[curso].grupos[grupo].asignaturas[asig]][diasAux], i, gt) && this.checkGrupo(grupoAux.nombreGrupo, grupo, this.grados[grado].curso[curso].cursoN.toLowerCase(), this.grados[grado].gradoCode)) this.grados[grado].curso[curso].grupos[grupo].grupo[i].martes = this.grados[grado].curso[curso].grupos[grupo].asignaturas[asig]
                        if (this.diasSemanaShort[dias] == 'X' && this.checkHora(data[this.grados[grado].curso[curso].grupos[grupo].nombreGrupo][this.grados[grado].curso[curso].grupos[grupo].asignaturas[asig]][diasAux], i, gt) && this.checkGrupo(grupoAux.nombreGrupo, grupo, this.grados[grado].curso[curso].cursoN.toLowerCase(), this.grados[grado].gradoCode)) this.grados[grado].curso[curso].grupos[grupo].grupo[i].miercoles = this.grados[grado].curso[curso].grupos[grupo].asignaturas[asig]
                        if (this.diasSemanaShort[dias] == 'J' && this.checkHora(data[this.grados[grado].curso[curso].grupos[grupo].nombreGrupo][this.grados[grado].curso[curso].grupos[grupo].asignaturas[asig]][diasAux], i, gt) && this.checkGrupo(grupoAux.nombreGrupo, grupo, this.grados[grado].curso[curso].cursoN.toLowerCase(), this.grados[grado].gradoCode)) this.grados[grado].curso[curso].grupos[grupo].grupo[i].jueves = this.grados[grado].curso[curso].grupos[grupo].asignaturas[asig]
                        if (this.diasSemanaShort[dias] == 'V' && this.checkHora(data[this.grados[grado].curso[curso].grupos[grupo].nombreGrupo][this.grados[grado].curso[curso].grupos[grupo].asignaturas[asig]][diasAux], i, gt) && this.checkGrupo(grupoAux.nombreGrupo, grupo, this.grados[grado].curso[curso].cursoN.toLowerCase(), this.grados[grado].gradoCode)) this.grados[grado].curso[curso].grupos[grupo].grupo[i].viernes = this.grados[grado].curso[curso].grupos[grupo].asignaturas[asig]
                      }
                    } catch (error) {
                      //sconsole.log("er: " + error)
                    }

                  }
                }
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


>>>>>>> c6653f7c571ba523e2fc86e37bceb85dc63da5dd
  ngOnInit() {
    this.horariosService.getJson()
  }

  displayedColumns: string[] = ['horas', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
  dataSource
}
