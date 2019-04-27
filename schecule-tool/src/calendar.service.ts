import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CalendarService {

  constructor( private http: HttpClient) { }

  //Añadir eventos 
  getEventos():Observable<any[]>{
    return this.http.get<any[]>('json/eventos.json');
  }
}
