import {NetworkConstants} from '../network/network-constants'
import { HttpClient } from '@angular/common/http';
import { Injectable, ElementRef, ViewChild, NgModule } from '@angular/core';
import * as jsPDF from 'jspdf';
import { SubjectModel } from '../subject-model';
import {DataConstants} from '../data-constants'

@Injectable({
    providedIn: 'root',
})

@NgModule({
    providers: [HttpClient, NetworkConstants], 
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

    //dataConstants =new DataConstants;
    constructor(private http: HttpClient, private networkConstants: NetworkConstants){

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
      }

    getJSONURL () {
        return this.networkConstants.getJSONEndpoint()
    } 

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
    
        doc.fromHTML(table.innerHTML, 80, 15, {
          'width': 210,
          'elementHandlers': specialElementHandlers,
        });
    
        try {
          doc.save('horarios.pdf');
          result = true;
        } catch (error) {
          console.log(error);
          result = false;
        }
        return result;
      }
      cargarMatriz(){
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
        //matrixTraveled = i == 12;
        matrixTraveled = false;
        if(!matrixTraveled){
          //AQUI METER UN ALERT.
          this.errorAlert = true;
          this.textAlert  = "The Schedule Matrix is not Loaded";

        }
        return matrixTraveled;
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
}