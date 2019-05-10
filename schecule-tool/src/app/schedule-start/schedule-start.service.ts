import {NetworkConstants} from '../network/network-constants'
import { HttpClient } from '@angular/common/http';
import { Injectable, ElementRef, ViewChild, NgModule } from '@angular/core';
import * as jsPDF from 'jspdf';

@Injectable({
    providedIn: 'root',
})

@NgModule({
    providers: [HttpClient, NetworkConstants],
  })
  
export class ScheduleStartService {

    constructor(private http: HttpClient, private networkConstants: NetworkConstants) { }

    getJson () {
    var result = null;
    this.http.get(this.getJSONURL()).subscribe(data => {        
        console.log(data)    
        result = data;
    });
    return result;
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

      @ViewChild('tabla') tabla: ElementRef;

      downloadPDF(){
        var result = null;
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
    
        try {
          doc.save('horarios.pdf');
          result = true;
        } catch (error) {
          console.log(error);
          result = false;
        }
        return result;
      }
}