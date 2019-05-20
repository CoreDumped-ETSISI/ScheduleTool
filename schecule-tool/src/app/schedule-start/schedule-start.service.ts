import {NetworkConstants} from '../network/network-constants'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, ElementRef, ViewChild, NgModule } from '@angular/core';
import * as jsPDF from 'jspdf';
import { SubjectModel } from '../subject-model';
import {DataConstants} from '../data-constants'
import { errorTrace } from '../TraceModule/errorTrace'
import { error } from '../TraceModule/error'
import { lineNumber } from '../TraceModule/errorLine'

@Injectable({
    providedIn: 'root',
})

@NgModule({
    providers: [HttpClient, NetworkConstants, lineNumber, errorTrace, error, HttpClientModule], 
})


export class ScheduleStartService {
  
    matrizHorario: SubjectModel[][][];
    matrizCoincidencias:boolean[][];
    matrizBotones:number [][];
    matrizBotonesPulsados:boolean [][];
    grupos:{};
    actualSubjects:string[];
    actualCourse:string [];
    inicialDias = ["L", "M", "X", "J", "V"];
    errorAlert = false;
    textAlert = "";
    organizationJSON:{};

    //dataConstants =new DataConstants;
    constructor(private http: HttpClient, private networkConstants: NetworkConstants, private ErrorLine: lineNumber, private ErrorTrace: errorTrace, private Error: error){

     }

    delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    }

    async getJson () {          
        var result;
        this.http.get(this.getJSONURL()).subscribe(data => {           
          result = data;
        });     
        await this.delay(1000);
        this.grupos = result;
        return result;
    }
    defineOrganization(){

    }
    async getJsonConnection () {
      var status;          
      this.http.get(this.getJSONURL(), {observe: 'response'}).subscribe(response => {        
        status = response.status;
        if(status === undefined){
          let err = new error();
          this.ErrorLine.fulfillError(err,'json undefined','FatalError', this.ErrorLine.ln())
          this.ErrorTrace.saveError(err,'FatalErrors','schedule-start.service.ts');
          this.ErrorTrace.showError(err, 'schedule-start.service.ts')
        }else if(status === null){
          let err = new error();
          this.ErrorLine.fulfillError(err,'json null','FatalError', this.ErrorLine.ln())
          this.ErrorTrace.saveError(err,'FatalErrors','schedule-start.service.ts');
          this.ErrorTrace.showError(err, 'schedule-start.service.ts')
        }
      }); 
      await this.delay(1000);
      return status;
    }

    getJSONURL () {
        return this.networkConstants.getJSONEndpoint('json')
    } 

    //detecta si el dispositivo es móvil o no
    detectMob() { 
        if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
        ){
          return true;
        }
        else {
          return false;
        }
      };

      downloadPDF(table){
        //console.log(table)
        var result = null;
        let doc = new jsPDF('p', 'pt', 'letter');      
        let specialElementHandlers = {
          '#editor': function(element, renderer){
            return true;
          } 
        };

        if(table.innerHTML != undefined){
          doc.fromHTML(table.innerHTML, 80, 15, {
            'width': 210,
            'elementHandlers': specialElementHandlers,
          });
        }else{
          return false;
        }
        
    
        try {
          doc.save('horarios.pdf');
          result = true;
        } catch (error) {
          let err = new error();
          this.ErrorLine.fulfillError(err,'Cant download pdf','DownloadError', this.ErrorLine.ln())
          this.ErrorTrace.saveError(err,'DownloadErrors','schedule-start.service.ts');
          this.ErrorTrace.showError(err, 'schedule-start.service.ts')
          result = false;
        }
        return result;
      }
      cargarMatriz(){//Tested
        let matrixTraveled = false;
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
        matrixTraveled = i == 12;
        if(!matrixTraveled){
          this.errorAlert = true;
          this.textAlert  = "The Schedule Matrix is not Loaded";

        }
        return matrixTraveled;
      }

      
      cargarMatrizBotones() {//Tested
        let matrixLoaded  = false;
        this.matrizBotonesPulsados = [];
        this.matrizBotones = [];
        if(this.actualSubjects.length > 0 && this.actualCourse.length > 0){
        for (var i: number = 0; i < this.actualSubjects.length; i++) {
          this.matrizBotonesPulsados[i] = [];
          this.matrizBotones[i] = [];
          for (var j: number = 0; j < this.actualCourse.length; j++) {
            this.matrizBotones[i][j] = j;
            this.matrizBotonesPulsados[i][j] = false;
          }
        }
        matrixLoaded = i == this.actualSubjects.length;
        if(!matrixLoaded){
          this.errorAlert = true;
          this.textAlert = "La matriz de botones no ha podido ser cargada.";
          console.log("MATRIZ DE BOTONES NO CARGADA HACER TRACE");
        }
      }
        return matrixLoaded;
      }
      
      cargarAsignatura(asignatura:string, grupoStr:string, row:number, col:number){//Tested
        /**
         * Must Be Defined:
         * grupos,
         * matrizHorario,
         * matrizCoincidencias,
         * all the dependencies of botonPulsado()
         * all the dependencies of limpiarAsignatura()
         */
        let pushed  = false;
        if(this.containsTheGroup(grupoStr) && this.contieneLaAsignatura(asignatura, grupoStr) ){
          let subject:SubjectModel = {nombre:asignatura, grupo:grupoStr};
          let clases = this.grupos[grupoStr][asignatura];
        console.log(clases);
        if(this.botonPulsado(row, col) && this.limpiarAsignatura(asignatura)){
          for(let day in clases){
            for(let hour in clases[day]){
              let hourPos = clases[day][hour] - 9;
              let dayPos = this.inicialDias.indexOf(day);
              if(!this.matrizHorario[hourPos][dayPos].includes(subject)){
                this.matrizHorario[hourPos][dayPos].push(subject);
                let tester = JSON.stringify(this.matrizHorario[hourPos][dayPos][this.matrizHorario[hourPos][dayPos].length - 1]);
                pushed = tester == JSON.stringify(subject);
              }
              this.matrizCoincidencias[hourPos][dayPos] = this.matrizHorario[hourPos][dayPos].length > 1;
            }  
          }
        }
        }
        
        if(!pushed){
          this.errorAlert = true;
          this.textAlert = "No se ha podido cargar la asignatura en el horario."
          //Meter un trace.
        }
        return pushed;
      }
      botonLimpiarAsignatura(asignatura:string, row:number){//Tested
        /*Must Be Defined:
          matrizBotonesPulsados,
          all the dependencies of limpiarAsignatura()
        */
        let removed = false;
        let counter = 0;
        if(this.matrizBotonesPulsados.length > 1 && this.matrizBotonesPulsados.length > row){
          for(let col in this.matrizBotonesPulsados[row]){
            this.matrizBotonesPulsados[row][col] = false;
            counter++;
          }
          //console.log("Limpiamos...");
          removed = this.limpiarAsignatura(asignatura) && counter >= this.matrizBotonesPulsados[row].length;
        }

        if(!removed){
          this.errorAlert = true;
          this.textAlert = "No se ha podido eliminar la asignatura."
        }
        return removed;
      }
      limpiarAsignatura(asignatura:string){//Tested
        /*Must Be Defined:
          matrizHorario,
          matrizCoincidencias,
        */
       let removed = false;
       if(asignatura != '' && this.matrizHorario.length > 1 && this.matrizCoincidencias.length > 1){
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
        removed = true;
        this.matrizHorario.forEach(row => {
          row.forEach((col) =>{
            col.forEach((subject) => {
              if(subject.nombre == asignatura){
                removed = false;
              }
            });
          });
        });
       }

        if(!removed){
          this.errorAlert = true;
          this.textAlert = "No se ha eliminado la asignatura.";
          //Meter un trace.
        }
        return removed;
      }
      botonPulsado(row:number, col:number){//Tested
        /*
        Must Be Defined:
        matrizBotonesPulsados
        */
        let touched = false;
        if(this.matrizBotonesPulsados.length > 0 && this.matrizBotonesPulsados.length > col  && col < this.matrizBotonesPulsados[0].length){
        for(let i in this.matrizBotonesPulsados[row]){
          this.matrizBotonesPulsados[row][i] = false;
        }
        this.matrizBotonesPulsados[row][col] = true;
        touched = true;
        }
        if(!touched){
        this.errorAlert = true;
        this.textAlert ="No se ha podido pulsar el boton."
        }
        if(!touched){
          this.errorAlert = true;
          this.textAlert = "No se ha podido pulsar el boton.";
          //Meter un trace;
        }
        return touched;
      }
      obtainActualSubjects(){//Tested
        /*
        Must Be Defined:
        grupos,
        actualCourse,
        */
        let obtained  = false;
        if(!this.isEmpty(this.grupos) && this.actualCourse.length > 0){
          for(var group in this.actualCourse){
            Object.keys(this.grupos[this.actualCourse[group]]).forEach(subject => {
              if(!this.actualSubjects.includes(subject)){
                this.actualSubjects.push(subject);
              }
            });
          }
          obtained = this.actualSubjects.length > 0;
        }
          if(!obtained){
          this.errorAlert = true;
          this.textAlert = "No se han podido cargar las asignaturas de este curso."
          //Meter un trace;
        }
        return obtained;
      }
      contieneLaAsignatura(subject:string, group:string){
        /*
        Must Be Defined:
        grupos
        */
        return Object.keys(this.grupos[group]).includes(subject);
      }
      containsTheGroup(group:string){
        return Object.keys(this.grupos).includes(group);
      }
      checkDesignedSchedule(){//Tested
        let traveled = false;
        if(this.matrizHorario.length > 1){
          for(let row in this.matrizHorario){
            for(let col in this.matrizHorario[row]){
              for(let asig in this.matrizHorario[row][col]){
                if(this.actualCourse.includes(this.matrizHorario[row][col][asig].grupo)){
                  this.botonPulsado(this.actualSubjects.indexOf(this.matrizHorario[row][col][asig].nombre), this.actualCourse.indexOf(this.matrizHorario[row][col][asig].grupo));
                }
              }
            }
          }
          traveled = true;  
        }
        if(!traveled){
          this.errorAlert = true;
          this.textAlert = "La matriz horario no se ha generado."
          //Meter un trace.
        }
        return traveled;
        
      }
      isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
}