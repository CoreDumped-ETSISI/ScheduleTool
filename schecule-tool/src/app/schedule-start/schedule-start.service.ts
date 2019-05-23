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
    constructor(private http: HttpClient, private networkConstants: NetworkConstants, private ErrorLine: lineNumber, private ErrorTrace: errorTrace, private Error: error){

     }

    delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    }

    //Hace la petición http para obtener el Json que se utilizará para que la aplicación funcione
    async getJson () {          
        var result;
        this.http.get(this.getJSONURL()).subscribe(data => {          
          result = data;
        });     
        await this.delay(1000);
        if(result == undefined){
          let err = new error();
          this.ErrorLine.fulfillError(err,'Se intenta hacer una llamada http get satisfactoria a la API y devuelve undefined', 'getJson')
          this.ErrorTrace.saveError(err,'FatalErrors','schedule-start.service.ts');
          this.ErrorTrace.showError(err, 'schedule-start.service.ts')
        } 
        this.grupos = result["GRUPOS"];
        this.organizationJSON = result["ORGANIZACION"];
        console.log(this.organizationJSON)
        return result;
    }

    //Comprueba que la conexión a la API es correcta
    async getJsonConnection () {
      console.log('hola')
      var status;          
      this.http.get(this.getJSONURL(), {observe: 'response'}).subscribe(response => {        
        status = response.status;        
      }); 
      await this.delay(1000);
      if(status >= 400){
        let err = new error();
        this.ErrorLine.fulfillError(err,'Se intenta hacer una llamada http get satisfactoria a la API y devuelve un error 400 o más', 'getJsonConnection')
        this.ErrorTrace.saveError(err,'FatalErrors','schedule-start.service.ts');
        this.ErrorTrace.showError(err, 'schedule-start.service.ts')
      }else if(status >= 500){
        let err = new error();
        this.ErrorLine.fulfillError(err,'Se intenta hacer una llamada http get satisfactoria a la API y devuelve un error 500 o más', 'getJsonConnection')
        this.ErrorTrace.saveError(err,'FatalErrors','schedule-start.service.ts');
        this.ErrorTrace.showError(err, 'schedule-start.service.ts')
      }
      return status;
    }

    //Obtiene la url para hacer la petición a la API para obtener el JSON
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

      //Función que genera un pdf a partir del html que se le pasa como parámetro y luego lo descarga
      downloadPDF(table){
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
          this.ErrorLine.fulfillError(err,'Se intenta descargar el pdf del horario pero no se ha podido', 'downloadPDF')
          this.ErrorTrace.saveError(err,'DownloadErrors','schedule-start.service.ts');
          this.ErrorTrace.showError(err, 'schedule-start.service.ts')
          result = false;
        }
        return result;
      }

      cargarMatriz(){//Tested
        //rellenamos las matrices con los días de la semana (5) y las horas que hay entre la primera y ultima clase, (12)
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
          this.textAlert  = "La matriz de horarios no se ha podido cargar.";
          let err = new error();
          this.ErrorLine.fulfillError(err,'La matriz de horarios no se ha podido cargar.', 'cargarMatriz')
          this.ErrorTrace.saveError(err,'FatalErrors','schedule-start.service.ts');
          this.ErrorTrace.showError(err, 'schedule-start.service.ts')

        }
        return matrixTraveled;
      }

      cargarGrados(){//UNTESTED
        //Devolvemos los nombre de los grados que hay en JSON.
        /**
         * Must Be Defined:
         * organizationJSON{}
         */
        let grados;
        if(!this.isEmpty(this.organizationJSON)){
          grados = Object.keys(this.organizationJSON)
        }
        console.log(grados);
        return grados;
      }
      cargarGrupos(actualGrade:string, actualCourse:string){//UNTESTED
        //Guardamos en actualCourse los grupos del curso que hemos seleccionado dentro del grado que hemos seleccionado. 
        let grupos;
        if(!this.isEmpty(this.organizationJSON)){
          grupos = this.organizationJSON[actualGrade][actualCourse];
          this.actualCourse = grupos;
        }
        return grupos;
      }
      cargarCursos(actualGrade){//UNTESTEDs
        //Cargamos los cursos del grado que hemos seleccionado, (Primero, Segundo, Tercero, ...)
        let cursos;
        if(!this.isEmpty(this.organizationJSON)){
          cursos = Object.keys(this.organizationJSON[actualGrade]);
        }
        return cursos;
      }
      cargarMatrizBotones() {//Tested
        //Con las dimensiones nºAsingaturas y nºGrupos generamos una matriz donde cada casilla corresponde al nombre del nombreAsigntaura y nombreGrupo
        // correspondientes con los arrays actualSubjects y actualCourse
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
          this.textAlert = "La matriz que controla los botones no se ha podido cargar.";
          let err = new error();
          this.ErrorLine.fulfillError(err,'La matriz que controla los botones no se ha podido cargar.', 'cargarMatrizBotones')
          this.ErrorTrace.saveError(err,'FatalErrors','schedule-start.service.ts');        
          this.ErrorTrace.showError(err, 'schedule-start.service.ts')

        }
      }
        return matrixLoaded;
      }
      
      cargarAsignatura(asignatura:string, grupoStr:string, row:number, col:number){//Tested
        /**
         * Recibimos el nombre y el grupo al que pertenece la asignatura asignatura y recorremos su horario,
         * colocamos la informacion (nombreAsignatura:grupoAsignatura) en las casillas correspondientes a la hora/dia a la que se imparte.
         * Row y Col solo se usa para cambiar el estado del boton a pulsado.
         * Must Be Defined:
         * grupos,
         * matrizHorario,
         * matrizCoincidencias,
         * all the dependencies of botonPulsado()
         * all the dependencies of limpiarAsignatura()
         */
        let pushed  = false;
        if(this.containsTheGroup(grupoStr) && this.contieneLaAsignatura(asignatura, grupoStr)){
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
              this.matrizCoincidencias[hourPos][dayPos] = this.matrizHorario[hourPos][dayPos].length > 1;//Comprobamos si existe mas de una asignatura en la misma casilla, para alertar de coincidencias.
            }  
          }
        }
        }
        if(!pushed){
          this.errorAlert = true;
          this.textAlert = "No se ha podido cargar la asignatura en el horario."
          let err = new error();
          this.ErrorLine.fulfillError(err,'No se ha podido cargar la asignatura en el horario.', 'cargarAsignatura')
          this.ErrorTrace.saveError(err,'FatalErrors','schedule-start.service.ts');        
          this.ErrorTrace.showError(err, 'schedule-start.service.ts')

        }
        return pushed;
      }
      botonLimpiarAsignatura(asignatura:string, row:number){//Tested
        /**
         * Cambiamos la fila de matrizBotonesPulsados al estado noPulsado.
          Must Be Defined:
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
          this.textAlert = "No se ha podido eliminar la asignatura al pulsar el boton de borrar."
          let err = new error();
          this.ErrorLine.fulfillError(err,'No se ha podido eliminar la asignatura al pulsar el boton de borrar.', 'botonLimpiarAsignatura')
          this.ErrorTrace.saveError(err,'HtmlErrors','schedule-start.service.ts');
          this.ErrorTrace.showError(err, 'schedule-start.service.ts')

        }
        return removed;
      }
      limpiarAsignatura(asignatura:string){//Tested

        /**
         * Recorremos la MatrizHorario buscando la asignatura que queremos borrar. Cuando la encuentra la borra de la celda y sigue buscando.
         * Must Be Defined:
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
          let err = new error();
          this.ErrorLine.fulfillError(err,'No se ha podido eliminar la asignatura.', 'limpiarAsignatura')
          this.ErrorTrace.saveError(err,'FatalErrors','schedule-start.service.ts');        
          this.ErrorTrace.showError(err, 'schedule-start.service.ts')

        }
        return removed;
      }
      botonPulsado(row:number, col:number){//Tested
        /*
        Cambiamos a Pulsado el estado del boton correspondiente en la matriz matrizBotones, usamos una matriz boolena auxialiar para mostrar ese estado,
        matrizBotonesPulsados[row][col] == true enotnces estado= Pulsado. Tambien cambiamos el estado a noPulsado del resto de botones de la fila.
        No se puede mostrar la informacion de 2 grupos sobre la misma asignatura a la vez.
        Must Be Defined:
        matrizBotonesPulsados
        */
        let touched = false;
        if(this.matrizBotonesPulsados.length > 0 && this.matrizBotonesPulsados.length > row  && col < this.matrizBotonesPulsados[0].length){
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
          this.textAlert = "Ha ocurrido un error al pulsar un boton del diseñador de horarios.";
          let err = new error();
          this.ErrorLine.fulfillError(err,'Ha ocurrido un error al pulsar un boton del diseñador de horarios.', 'botonPulsado')
          this.ErrorTrace.saveError(err,'HtmlErrors','schedule-start.service.ts');
          this.ErrorTrace.showError(err, 'schedule-start.service.ts')

        }
        return touched;
      }
      obtainActualSubjects(){//Tested
        /*
        GUARDAMOS LAS ASIGNATURAS DEL CURSO ACTUAL EN EL ARRAY DE actualSubjects.
        Must Be Defined:
        grupos,
        actualCourse,
        */
        let obtained  = !this.isEmpty(this.grupos) && this.actualCourse != undefined && this.actualCourse.length > 0;
        if(obtained){
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
          let err = new error();
          this.ErrorLine.fulfillError(err,'No se han podido cargar las asignaturas de este curso.', 'obtainActualSubjects')
          this.ErrorTrace.saveError(err,'FatalErrors','schedule-start.service.ts');        
          this.ErrorTrace.showError(err, 'schedule-start.service.ts')

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
          this.textAlert = "La matriz matrizHorario no se ha generado correctamente."
          let err = new error();
          this.ErrorLine.fulfillError(err,'La matriz matrizHorario no se ha generado correctamente.', 'checkDesignedSchedule')
          this.ErrorTrace.saveError(err,'FatalErrors','schedule-start.service.ts');
          this.ErrorTrace.showError(err, 'schedule-start.service.ts')
          
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